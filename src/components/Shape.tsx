import type { ComponentProps, ReactNode } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";


interface ShapeProps extends ComponentProps<'div'> {
    children?: ReactNode;
}

export function Shape({ className, children, ...props }: ShapeProps) {
	return (
		<div className={twMerge("w-full bg-white rounded-2xl h-auto overflow-hidden p-4 sm:p-6", className,)}{...props}>
            {children ? children : "--vazio--"}
        </div>
	);
}