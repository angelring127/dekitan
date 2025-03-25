import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default InputField;
