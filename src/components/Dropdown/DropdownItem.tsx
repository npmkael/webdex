import { DropdownType } from "../../types";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<DropdownType | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  option: {
    value?: string;
    icon?: string;
    label: string;
  };
};

const DropdownItem = ({ setSelected, setOpen, option }: Props) => {
  return (
    <div
      className="dropdown-item"
      onClick={() => {
        setSelected({
          icon: option.icon,
          label: option.label,
          value: option.value,
        });
        setOpen(false);
      }}
    >
      <span className="pokemon-icon">{option.icon}</span>
      <p>{option.label}</p>
    </div>
  );
};

export default DropdownItem;
