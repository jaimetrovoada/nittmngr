"use client";
import { useContext } from "react";
import { SelectContext } from "./SelectProvider";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
}

const Select = ({ options }: SelectProps) => {
  const { selectedOption, setSelectedOption } = useContext(SelectContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption && setSelectedOption(event.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

export const SelectedOptionDisplay = () => {
  const { selectedOption } = useContext(SelectContext);

  return <div>Selected option: {selectedOption}</div>;
};
