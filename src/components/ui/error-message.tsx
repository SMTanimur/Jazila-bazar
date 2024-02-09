import React from "react";
interface ErrorProps {
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <p className="mt-2 text-xs text-red-500 ltr:text-left text-right">
      {message!}
    </p>
  );
};
