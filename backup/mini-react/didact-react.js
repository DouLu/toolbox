/**
 * transfer JSX to element
 * jsx是js扩展的一种语法糖，方便在js里编写html代码
 * createElement是将jsx转化react element的对象
 */
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const createElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children.map((child) =>
      typeof child === "object" ? child : createTextElement(child)
    ),
  },
});

const Didact = {
  createElement,
};

// fiber树渲染完，则currentRoot指向workInProgressRoot
// 下次update时创建新的workInProgressRoot
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(workInProgressRoot.child);
  currentRoot = workInProgressRoot;
  workInProgressRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  //   const domParent = fiber.parent.dom;
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "EDELETION") {
    // domParent.removeChild(fiber.dom);
    commitDeletion(fiber, domParent);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}
/**
 * render将react element渲染成HTML DOM节点
 * @param {*} element
 * @param {*} container
 */
let nextUnitOfWork = null;
let workInProgressRoot = null;
let currentRoot = null;
let deletions = null;
function render(element, container) {
  workInProgressRoot = {
    dom: container,
    props: { children: [element] },
    // 指向旧fiber节点
    alernate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = workInProgressRoot;
  //   nextUnitOfWork = {
  //     dom: container,
  //     props: { children: [element] },
  //   };

  //   element.props.children.forEach((child) => {
  //     render(child, dom);
  //   });

  //   container.appendChild(dom);
}

/**
 * concurrent mode 并发模式，可中断的持续渲染模式
 * 当遇到高优先级的操作时，可以停止当前的渲染，去执行高优先级操作，高优先级操作完成后，再继续之前打断了的渲染工作
 * requestIdleCallback
 * react-scheduler实现了跟requestIdleCallback一样的功能，但它跟贴近react
 */

/**
 *
 * @param {*} deadline 浏览器空闲给work loop的剩余时间
 */
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

/**
 * fibers -》 fiber tree：把所有任务单元组织起来的一个数据结构
 * 每个element都是一个fiber，每个fiber都是一个任务单元
 * 每个fiber节点都有分别指向父节点、子节点和相邻节点的指针
 * 每次work的寻找过程：先找子节点，如果有则将它作为next fiber；如果没有则找相邻节点，有相邻节点则将相邻节点作为next fiber；
 * 如果没有子节点和相邻节点则一个work unit完成，开始往父节点“归”
 */

/**
1.add the element to the DOM
2.create the fibers for the element’s children
3.select the next unit of work
 * @param {*} nextUnitOfWork :fiber node
 */
function performUnitOfWork(fiber) {
  //   if (!fiber.dom) {
  //     fiber.dom = createDom(fiber);
  //   }
  //   const elements = fiber.props.children;
  //   reconcileChildren(fiber, elements);
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  //   if (fiber.parent) {
  //     fiber.parent.dom.appendChild(fiber.dom);
  //   }

  //   const elements = fiber.props.children;
  //   let index = 0;
  //   let prevSibling = null;
  //   while (index < elements.length) {
  //     const element = elements[index];
  //     const newFiber = {
  //       type: element.type,
  //       props: element.props,
  //       parent: fiber,
  //       dom: null,
  //     };
  //     // 第一个字节点为child，其他的为sibling节点
  //     if (index === 0) {
  //       fiber.child = newFiber;
  //     } else {
  //       prevSibling.sibling = newFiber;
  //     }

  //     prevSibling = newFiber;
  //     index++;
  //   }

  // 返回nextUnitOfWork
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 往上寻找父节点的相邻节点
    nextFiber = nextFiber.parent;
  }
}

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}
let hookIndex = null;
function updateFunctionComponent(fiber) {
  workInProgressRoot = fiber;
  hookIndex = 0;
  workInProgressRoot.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

/**
 * reconciliation：标记fiber该如何变化，例如：删除、更新、添加等操作
 *
 */
function reconcileChildren(workInProgressRoot, elements) {
  let index = 0;
  let prevSibling = null;
  let oldFiber =
    workInProgressRoot.alernate && workInProgressRoot.alernate.child;
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: workInProgressRoot,
      dom: null,
    };
    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: workInProgressRoot,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: workInProgressRoot,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      workInProgressRoot.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children";
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function useState(initial) {
  const oldHook =
    workInProgressRoot.alternate &&
    workInProgressRoot.alternate.hooks &&
    workInProgressRoot.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    workInProgressRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = workInProgressRoot;
    deletions = [];
  };

  workInProgressRoot.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
