import { Button, Form, Input, Modal, Space } from "antd";
import { useEffect } from "react";
import ColorSelector from "./ColorSelector";

export type ColumsType = {
  id: number;
  title: string;
  color: string;
  desc?: string;
};
type TodoColumsModalProps = {
  open: boolean;
  initialValue?: ColumsType;
  handleCancel: () => void;
  handleSave: (values: ColumsType) => void;
};
const TodoColumsModal: React.FC<TodoColumsModalProps> = ({
  open,
  initialValue,
  handleCancel,
  handleSave,
}) => {
  const [form] = Form.useForm<ColumsType>();
  const labelText = Form.useWatch("title", form);

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (!open) form?.resetFields();
  }, [open]);

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
      <Form
        layout="vertical"
        form={form}
        onFinish={() => {
          handleSave(form.getFieldsValue(true));
        }}
      >
        <Form.Item name="title" label="Label text" required>
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorSelector />
        </Form.Item>
        {/* FIXME: text area组件为什么报错？ */}
        <Form.Item name="desc" label="Description">
          <Input />
        </Form.Item>
        {/* <Form.Item name="desc" label="Description">
          <Input.TextArea rows={6} />
        </Form.Item> */}
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

export default TodoColumsModal;
