import type { ComponentProps, ReactNode } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";


interface ImageProps extends ComponentProps<'img'> {
    
}

export function Image({ className, children, ...props }: ImageProps) {
	return (
		<img className={twMerge("w-auto rounded-2xl h-auto overflow-hidden", className,)}
        {...props}
        src={props.src}
        draggable="false"
        />
	);
}