import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import DropdownItem from "./DropdownItem";
import { DropdownType } from "../../types";
import { ChevronDown } from "lucide-react";

type Props = {
  placeholder: string;
  options: DropdownType[];
  selected: DropdownType | null;
  onSelect: React.Dispatch<React.SetStateAction<DropdownType | null>>;
};

const Dropdown = ({ placeholder, options, selected, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="dropdown"
      ref={dropdownRef}
    >
      <button
        className="dropdown-btn"
        onClick={() => setOpen((pv) => !pv)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="dropdown-label">
          {selected ? (
            <>
              <span className="pokemon-icon">{selected.icon}</span>
              <p>{selected.label}</p>
            </>
          ) : (
            <>
              <span className="pokemon-icon">s</span>
              <p>{placeholder}</p>
            </>
          )}
        </div>
        <motion.span variants={iconVariants}>
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <motion.div
        initial={wrapperVariants.closed}
        animate={open ? "open" : "closed"}
        variants={wrapperVariants}
        style={{ originY: "top" }}
        className="dropdown-content"
      >
        {options.map((option, index) => (
          <DropdownItem
            setSelected={onSelect}
            setOpen={setOpen}
            option={option}
            key={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const wrapperVariants = {
  open: {
    opacity: 1,
    scaleY: 1,
  },
  closed: {
    opacity: 0,
    scaleY: 0,
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

export default Dropdown;
