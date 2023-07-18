import { Button, Form, Input, Modal, Space } from "antd";
import useTodo from "../hooks/useTodo";
import ColorSelector from "./ColorSelector";

type ColumsType = { title: string; color: string; desc: string };
type AddColumsProps = {
  open: boolean;
  initialData?: ColumsType;
  handleCancel: () => void;
  saveColums: (data: ColumsType) => void;
};
const AddColums: React.FC<AddColumsProps> = ({
  open,
  initialData,
  handleCancel,
  saveColums,
}) => {
  const [form] = Form.useForm<ColumsType>();
  const labelText = Form.useWatch("title", form);
  const { postTodoColums } = useTodo();
  const onFinish = () => {
    const data = form.getFieldsValue();
    // @ts-ignore
    postTodoColums(data);
  };
  return (
    <Modal
      title="Edit options"
      open={open}
      onCancel={handleCancel}
      footer={false}
    >
      <div className="preview-label">
        <span>{labelText}</span>
      </div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="title" label="Label text" required>
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorSelector />
        </Form.Item>
        <Form.Item name="desc" label="Description">
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddColums;
