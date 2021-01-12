import React from "react";

interface IProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IProps) => {
  const { id, label, name, value, onChange, placeholder } = props;
  return (
    <div>
      <label>{label}</label>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
