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
import useTodo from "../hooks/useTodo";
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
  handleSave: (todo: TodoItemType) => void;
  // TODO: 使用reducer来组织数据
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
  columnList = [],
}) => {
  const [todoInfo, setTodoInfo] = useState<TodoItemType>();
  const { deleteTodo, getUnionList } = useTodo();

  useEffect(() => {
    console.log("🚀 ~ file: TodoModal.tsx:59 ~ initialValue:", initialValue);
    setTodoInfo(initialValue);
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
    const updateValue = { title, lastModify };

    if (todoInfo?.id) {
      handleSave({ ...todoInfo, ...updateValue });
    } else {
      const createTime = getCurrentTime();
      // @ts-ignore
      handleSave({
        createTime,
        author: "DL",
        tag: "string",
        status: "Done",
        ...updateValue,
      });
    }
  };

  const doDelete = () => {
    deleteTodo(todoInfo?.id!);
    // FIXME: 用reducer解决不刷新问题
    getUnionList();
    handleClose();
  };

  return (
    <Modal
      destroyOnClose
      width={1000}
      open={open}
      onCancel={handleClose}
      footer={false}
      title={false}
    >
      <EditableTitle initialValue={todoInfo} onSave={doSave} />
      <Divider />
      <Row wrap={false}>
        <Col flex={3}>
          <MDXEditor
            markdown={todoInfo?.content || ""}
            contentEditableClassName="editor-panel"
            onChange={(content) => {
              // @ts-ignore
              setTodoInfo({ ...todoInfo, content });
            }}
          />
          <Row justify={"end"}>
            <Button disabled={!todoInfo} onClick={doDelete}>
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
  const [value, setValue] = useState(initialValue?.title || "");
  const [isEdit, setIsEdit] = useState(!initialValue || false);
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
            <Typography.Title level={3}>{initialValue?.title}</Typography.Title>
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
        <Tag>author: {initialValue?.author}</Tag>
        <Tag>create time: {initialValue?.createTime}</Tag>
        <Tag>update time: {initialValue?.lastModify}</Tag>
      </Space>
    </>
  );
};
