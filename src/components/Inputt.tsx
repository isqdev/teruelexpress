import { Divide } from "phosphor-react";
import React, { ReactNode } from "react"
import { type ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface InputProps extends ComponentProps<'input'> {
    header?: string;
    message?: string;
    msgColor?: "danger-base" | "success-base";
    children?: ReactNode;
    borderColor?: "danger-base" | "success-base";
    
}

export function Input({ className, children, header, message, msgColor, borderColor, ...props }: InputProps) {
    const childrenArray = React.Children.toArray(children);
    const first = childrenArray[0] !== "skip" && childrenArray[0];
    const last = childrenArray[1];

    let borderClass = "border-gray-600";

    if (borderColor === "danger-base") {
    borderClass = "border-danger-base";
    } else if (borderColor === "success-base") {
    borderClass = "border-success-base";
    } else if (borderColor === "blue-tx") {
    borderClass = "border-blue-tx";
    }

    return (
        <>  
        
            {header&& <div className="font-bold text-xs sm:text-base">{header}</div>}
            <div className={`flex border-2 gap-3 ${borderClass} w-full h-14 px-3 rounded-2xl items-center focus-within:border-blue-500 text-gray-600`}>
                {(first && first!=="skip")  && <div>{first}</div>}
                <input
                    className= {twMerge(`bg-white  outline-none w-full text-base md:text-xl placeholder-gray-600 text-black`, className,)}
                    {...props}
                />
                {last && <div>{last}</div>}
            </div>
            {message ? <div className={`font-bold text-xs sm:text-base text-right text-${msgColor&& msgColor}`}>{message}</div> : <div className="select-none">⠀</div>}
            
        </>
    
    )
}