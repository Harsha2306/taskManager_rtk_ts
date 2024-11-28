type DropdownProps<T> = {
  label: string;
  options: T[];
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  style: React.CSSProperties;
};

const Dropdown = <T,>({
  label,
  options,
  getOptionLabel,
  getOptionValue,
  value,
  onChange,
  style,
}: DropdownProps<T>) => {
  return (
    <div style={style}>
      <label>
        {label}
        <select value={getOptionValue(value)} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
