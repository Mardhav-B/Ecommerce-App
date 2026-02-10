import type { FC, ButtonHTMLAttributes } from "react";
import cn from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
