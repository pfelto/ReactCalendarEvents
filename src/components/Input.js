import React from "react";

export const Input = ({ label, id, register, type, required }) => (
  <>
    <label>{label}</label>
    <input type={type} {...register(id, { required })} />
  </>
);
