import type { ComponentProps } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface InputRootProps extends ComponentProps<"div"> {
  status?: "default" | "error" | "validated";
}

export function InputRoot({ status = "default", ...props }: InputRootProps) {
  return (
    <div
      data-status={status}
      className="group bg-white h-12 sm:h-14 border-2 border-gray-600 rounded-2xl px-3 flex items-center gap-3 focus-within:border-blue-500 data-[status=error]:border-danger-base data-[status=validated]:border-success-base"
      {...props}
    />
  );
}

interface InputIconProps extends ComponentProps<"span"> {}

export function InputIcon(props: InputIconProps) {
  return (
    <span
      className="text-gray-600 group-focus-within:text-blue-500 group-data-[error=true]:text-danger-base group-data-[status=error]:border-danger-base data-[status=validated]:border-success-base"
      {...props}
    />
  );
}

interface InputFieldProps extends ComponentProps<"input"> {}

export function InputField(props: InputFieldProps) {
  return (
    <>
      <input
        className="flex-1 outline-0 placeholder:gray-600 text-base md:text-xl w-full"
        {...props}
      />
    </>
  );
}

interface InputLabelProps extends ComponentProps<"label"> {}

export function InputLabel({ className, ...props }: InputLabelProps) {
  return (
    <label
      className={twMerge(
        "font-bold text-xs sm:text-base text-black",
        className
      )}
      {...props}
      {...props}
    />
  );
}

export function InputMessage({ className, ...props }: InputLabelProps) {
  return (

    <span
      className={twMerge(
        "font-bold text-xs sm:text-base text-red-50 flex justify-end",
        className
      )}
      {...props}
      />
  );
}
