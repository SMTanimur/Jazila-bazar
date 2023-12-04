/* eslint-disable react/display-name */
import React from "react";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelKey?: string;
  label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ labelKey, label, ...rest }, ref) => {
    return (
      <label className="group flex items-center text-heading text-sm cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-gray-900 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-gray-900 checked:hover:bg-gray-900 checked:focus:bg-gray-900"
          ref={ref}
          {...rest}
        />
        <span className="ms-4 -mt-0.5">{labelKey ? labelKey : label}</span>
      </label>
    );
  }
);
