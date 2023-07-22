import { TodoItemType } from "./TodoModal";

const TodoItemCard = ({
  id,
  title,
  handleEdit,
}: {
  id: number;
  title: string;
  handleEdit: (id: number) => void;
}) => {
  // TODO: drag&drop component,参考 - http://react-grid-layout.github.io/react-draggable/example/
  return (
    <div className="todo-card">
      <p className="draft-icon">Draft</p>
      <a
        href="none"
        onClick={(e) => {
          e.preventDefault();
          handleEdit(id);
        }}
      >
        {title}
      </a>
    </div>
  );
};

const TodoList: React.FC<{
  dataSource: TodoItemType[] | null | undefined;
  handleEdit: (id: number) => void;
}> = ({ dataSource, handleEdit }) => {
  return (
    <div className="todoList-panel">
      {(dataSource || []).map((d) => (
        <TodoItemCard
          key={d.id}
          handleEdit={handleEdit}
          id={d.id}
          title={d.title}
        />
      ))}
    </div>
  );
};

export default TodoList;
