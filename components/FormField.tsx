"use client";

import { tuple } from "better-auth";
import React from "react";

interface OptionProps  {
    label:string;
    value:string;
}

interface FormFieldProps {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  visibility?: string;
  type?: string;
  Ref?: React.Ref<any>;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  as?: string;
  options?: OptionProps[];
}

const FormField = ({
  id,
  label,
  value,
  placeholder = "",
  visibility = "public",
  type = "text",
  Ref,
  handleChange,
  as = "input",
  options ,
}: FormFieldProps) => {
  const InputToRender = ({ type }: { type: string }) => {
    if (type === "textarea") {
      return <textarea ref={Ref} id={id} name={id} placeholder={placeholder} />;
    } else if (type === "select") {
      return (
        <select ref={Ref} id={id} name={id}>
          {options!.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    } else {
      return <input ref={Ref} id={id} name={id} placeholder={placeholder} />;
    }
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <InputToRender type={as} />
    </div>
  );
};

export default FormField;
