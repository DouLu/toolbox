import { TodoItemType } from "./TodoModal";

const TodoList: React.FC<{
  dataSource: TodoItemType[] | null | undefined;
  handleEdit: (id: number) => void;
}> = ({ dataSource, handleEdit }) => {
  return (
    <>
      {(dataSource || []).map((d) => (
        <div className="todo-card" key={d.id}>
          <p className="draft-icon">Draft</p>
          <a
            href="none"
            onClick={() => {
              handleEdit(d.id);
            }}
          >
            {d.title}
          </a>
        </div>
      ))}
    </>
  );
};

export default TodoList;
