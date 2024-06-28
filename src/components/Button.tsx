import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({ children, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-70 ${className}`}
      disabled={props.loading || disabled}
      {...props}
    >
      {
        // @ts-ignore
        props.loading ? <p className="animate-spin">..</p> : children
      }
    </button>
  );
};

export default Button;
