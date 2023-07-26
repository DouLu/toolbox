import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { getCurrentTime } from "../utils";
import { ColumsType } from "./TodoColumsModal";

export type TodoItemType = {
  id: number;
  categoryId: number;
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
  handleDelete: () => void;
  handleSave: (todo: TodoItemType) => void;
  columnList?: ColumsType[];
};

const getOptions = (data: ColumsType[]) =>
  data.map((d) => ({
    value: d.id,
    label: <Tag color={d.color}>{d.title}</Tag>,
  }));

const TodoModal: React.FC<TodoModalProps> = ({
  open,
  initialValue,
  handleSave,
  handleClose,
  handleDelete,
  columnList = [],
}) => {
  const [todoInfo, setTodoInfo] = useState<TodoItemType>();

  useEffect(() => {
    if (initialValue) {
      setTodoInfo(initialValue);
    } else {
      // @ts-ignore
      setTodoInfo({ categoryId: 1 });
    }
  }, [initialValue]);

  const doSave = (val: string | any) => {
    const lastModify = getCurrentTime();
    const title = typeof val === "string" ? val : todoInfo?.title || "";
    const updateValue: any = { ...todoInfo, title, lastModify };

    if (todoInfo?.id) {
      handleSave(updateValue);
    } else {
      const createTime = getCurrentTime();
      // @ts-ignore
      handleSave({
        ...updateValue,
        createTime,
        author: "DL",
        tag: "string",
        status: "Done",
      });
    }
  };

  return (
    <Modal
      width={1000}
      open={open}
      onCancel={handleClose}
      footer={false}
      title={false}
    >
      <EditableTitle
        key={JSON.stringify(initialValue?.title)}
        initialValue={initialValue}
        onSave={doSave}
      />
      <Divider />
      <Row wrap={false}>
        <Col flex={3}>
          <MDXEditor
            key={JSON.stringify(initialValue?.content)}
            markdown={initialValue?.content || ""}
            contentEditableClassName="editor-panel"
            onChange={(content) => {
              // @ts-ignore
              content && setTodoInfo({ ...todoInfo, content });
            }}
          />
          <Row justify={"end"}>
            <Button disabled={!todoInfo} onClick={handleDelete}>
              delete
            </Button>
            <Button
              type="primary"
              disabled={!todoInfo?.content}
              onClick={doSave}
            >
              Save
            </Button>
          </Row>
        </Col>
        <Col flex="none">
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col flex={1}>
          <span>Status</span>
          <Select
            defaultValue={todoInfo?.categoryId}
            options={getOptions(columnList)}
            onSelect={(categoryId) => {
              // @ts-ignore
              setTodoInfo({ ...todoInfo, categoryId });
            }}
            style={{ width: 130 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};
export default TodoModal;

const EditableTitle: React.FC<{
  initialValue?: TodoItemType;
  onSave?: (value: string) => void;
}> = ({ initialValue, onSave }) => {
  const { title = "", author, createTime, lastModify } = initialValue || {};
  const [value, setValue] = useState(title);
  const [isEdit, setIsEdit] = useState(!title || false);
  return (
    <>
      <Row
        justify={"space-between"}
        wrap={false}
        style={{ padding: "0 13px", alignItems: "baseline" }}
      >
        {isEdit ? (
          <>
            <Input
              width={"100%"}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="please enter title of todo"
            />
            <Space>
              <Button
                type="primary"
                disabled={!value}
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
            </Space>
          </>
        ) : (
          <>
            <Typography.Title level={3}>{title}</Typography.Title>
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
      </Row>
      <Space>
        <Tag>Draft</Tag>
        <Tag>author: {author}</Tag>
        <Tag>create time: {createTime}</Tag>
        <Tag>update time: {lastModify}</Tag>
      </Space>
    </>
  );
};
