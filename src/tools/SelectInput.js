import React from "react";
const SelectInput = (props) => {
  const {label, name, onChange, defaultOption, value, error, options } = props;
  const className = error ? "form-control is-invalid " : "form-control";
  return (
    <div className="form-group">
      <label className="text-body font-weight-bold">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      >
        <option value="">{defaultOption}</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};
export default SelectInput;
