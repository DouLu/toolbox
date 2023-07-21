import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { Button, Col, Modal, Row, Space, Typography } from "antd";

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
    <Modal
      open={!open}
      onCancel={handleClose}
      title={
        initialValue ? <TodoTitle {...initialValue} /> : <p>create modal ...</p>
      }
    >
      <Row>
        <Col flex={3}>
          <MDXEditor markdown={"sss"} />
        </Col>
        <Col flex={1}>
          status,
          <Button>delete</Button>
        </Col>
      </Row>
    </Modal>
  );
};
export default TodoModal;

const TodoTitle: React.FC<TodoItemType> = ({ title, author, createTime }) => {
  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Space>
        <span>Draft</span>
        <span>{author}</span>
        <span>{createTime}</span>
      </Space>
    </>
  );
};
