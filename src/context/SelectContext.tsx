import { createContext, useContext, useState } from "react";
import { DropdownType } from "../types";

type SelectContextType = {
  selectType: DropdownType | null;
  selectSort: DropdownType | null;
  setSelectType: React.Dispatch<React.SetStateAction<DropdownType | null>>;
  setSelectSort: React.Dispatch<React.SetStateAction<DropdownType | null>>;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

// Custom hook
export const useSelect = () => {
  const context = useContext(SelectContext);

  if (!context)
    throw new Error("useSelect must be used within a SelectProvider");

  return context;
};

export const SelectProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectType, setSelectType] = useState<DropdownType | null>(null);
  const [selectSort, setSelectSort] = useState<DropdownType | null>({
    label: "Ascending",
    value: "asc",
  });

  return (
    <SelectContext.Provider
      value={{
        selectType,
        selectSort,
        setSelectType,
        setSelectSort,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
