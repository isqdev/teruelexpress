import type { ComponentProps, ReactNode } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps extends ComponentProps<"body"> {
  children?: ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={twMerge("px-6 py-16 sm:px-8 md:px-20 mx-auto max-w-495", className)}
      {...props}
    >
      {children ? children : "--vazio--"}
    </section>
  );
}

// lg:px-40 lg:py-20 xl:px-60 max-w-495 responsividade para pc
