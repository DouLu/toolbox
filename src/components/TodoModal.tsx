import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { Button, Col, Input, Modal, Row, Space, Tag, Typography } from "antd";
import { useState } from "react";
import useTodo from "../hooks/useTodo";

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
  const [markdown, setMarkdown] = useState("");
  const { todoInfo, setTodoInfo } = useTodo();

  return (
    <Modal
      width={1000}
      open={!open}
      onCancel={handleClose}
      title={<EditableTitle />}
    >
      <Row wrap={false}>
        <Col flex={3}>
          <MDXEditor
            markdown={markdown}
            contentEditableClassName="editor-panel"
            onChange={setMarkdown}
          />
        </Col>
        <Col flex={1}>
          <Tag color="green">status</Tag>
          <Button>delete</Button>
        </Col>
      </Row>
    </Modal>
  );
};
export default TodoModal;

const EditableTitle: React.FC<{
  initialValue?: string;
  onSave?: (value: string) => void;
}> = ({ initialValue, onSave }) => {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Space>
      {isEdit ? (
        <>
          <Input
            value={initialValue}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              onSave?.(value);
              setIsEdit(false);
            }}
          >
            Save
          </Button>
          <Button
            type="default"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography.Title level={3}>{initialValue}</Typography.Title>
          <Button
            type="text"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Edit title
          </Button>
        </>
      )}
    </Space>
  );
};

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
