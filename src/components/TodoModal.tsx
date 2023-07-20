import { Modal } from "antd";

export type TodoItemType = {
  id: number;
  title: string;
  content: string;
  tag: string;
  status: string;
  createTime: string;
  lastModify: string;
  author: string;
};

type TodoModalProps = {
  open: boolean;
  initialValue?: TodoItemType;
  handleClose: () => void;
};

const TodoModal: React.FC<TodoModalProps> = ({
  open,
  initialValue,
  handleClose,
}) => {
  return (
    <Modal open={open} onCancel={handleClose}>
      todo
    </Modal>
  );
};
export default TodoModal;
