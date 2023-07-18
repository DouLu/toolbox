import { TodoItemType } from "./AddItem";

const TodoItemCard = ({ title }: { title: string }) => {
  return (
    <div className="todo-card">
      <p className="draft-icon">Draft</p>
      <a href="none">{title}</a>
    </div>
  );
};

const TodoItemList = ({
  dataSource,
}: {
  dataSource: TodoItemType[] | null;
}) => {
  return (
    <>
      {(dataSource || []).map((d) => (
        <TodoItemCard key={d.id} title={d.title} />
      ))}
    </>
  );
};

export { TodoItemCard, TodoItemList };
