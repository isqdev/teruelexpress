import React from "react";
import { ArrowLeft, List } from "phosphor-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader({ screenTitle }: { screenTitle: string }) {
  return (
    <div className="xl:col-span-2 flex items-center">
      <Link to="/app/home">
        <ArrowLeft className="text-black size-8 icon" />
      </Link>
      <h3 className="text-center flex-auto">{screenTitle}</h3>
      <div className="relative w-6 h-7">
        <SidebarTrigger className="absolute inset-0 w-6 h-6 z-2 opacity-0 cursor-pointer" />
        <List className="absolute inset-0  w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
}
