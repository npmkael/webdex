export type DropdownType = {
  icon?: string;
  label: string;
  value?: string;
};

export type PaginationType = {
  value: {
    limit: number;
    offset: number;
  };
  label: string;
};
