import { CheckCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useEffectOnce } from "react-use";

const STATUS_COLORS = [
  { inactive: "#f6f8fa", active: "#656d76" },
  { inactive: "#ddf4ff", active: "#0969da" },
  { inactive: "#dafbe1", active: "#1a7f37" },
  { inactive: "#fff8c5", active: "#9a6700" },
  { inactive: "#fff1e5", active: "#bc4c00" },
  { inactive: "#ffebe9", active: "#d1242f" },
  { inactive: "#ffeff7", active: "#bf3989" },
  { inactive: "#fbefff", active: "#8250df" },
];

const DEFAULT_COLOR = STATUS_COLORS[0].active;

interface ColorSelectorProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  defaultValue = STATUS_COLORS[0].active,
  value,
  onChange,
}) => {
  useEffectOnce(() => {
    onChange?.(value || defaultValue || DEFAULT_COLOR);
  });

  return (
    <Space>
      {STATUS_COLORS.map((s) => (
        <span
          key={s.inactive}
          className="check-icon-wrap"
          style={{
            backgroundColor: value === s.active ? s.active : s.inactive,
          }}
        >
          <CheckCircleOutlined
            style={{
              color: "#fff",
            }}
            onClick={() => {
              onChange?.(s.active);
            }}
          />
        </span>
      ))}
    </Space>
  );
};

export default ColorSelector;
