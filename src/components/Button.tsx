import React from "react";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-gray-100 w-full h-12 sm:h-14 hover:cursor-pointer hover:scale-101 hover:opacity-90 duration-200 px-3 rounded-2xl flex items-center gap-3",
        className
      )}
      {...props}
    >
      {children ? children : "--vazio--"}
    </button>
  );
}

interface ButtonTextProps extends ComponentProps<"span"> {}

export function ButtonText({ children, className, ...props }: ButtonTextProps) {
  return (
    <span
      className={twMerge("text-base w-full text-left sm:text-xl font-bold", className)}
      {...props}
    >
      {children}
    </span>
  );
}
