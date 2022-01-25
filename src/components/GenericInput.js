/* eslint-disable react/prop-types */
import React from "react";

export const GenericInput = ({
  id,
  type,
  value,
  checked,
  onChange,
  onBlur,
  disabled,
  min,
  children,
}) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        checked={checked}
        onBlur={onBlur}
        disabled={disabled}
        min={min}
      ></input>
    </>
  );
};
