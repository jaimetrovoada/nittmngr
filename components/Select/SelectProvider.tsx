"use client";
import { createContext, useState } from "react";

interface SelectContextValue {
  selectedOption?: string;
  setSelectedOption?: (value: string) => void;
}

export const SelectContext = createContext<SelectContextValue>({});

interface Props {
  children: React.ReactNode;
}

const SelectProvider = ({ children }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("random");

  return (
    <SelectContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectContext.Provider>
  );
};

export default SelectProvider;
