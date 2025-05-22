import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { Menu } from "./Menu";
import { useState } from "react";
import { List } from "phosphor-react";

export function Header() {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <header className="px-6 py-2 sm:px-4 md:px-10 mx-auto max-w-495 sticky top-0 bg-white z-1 flex justify-between">
                <Image src="src\assets\logo.jpg" className="w-26"/>
                <Image src="src\assets\logo-full.png" className="w-26"/>
                <List className="icon self-center" onClick={() => {setMenu(!menu)}}/>
            </header>
                {/* <Menu className="z-1"></Menu> */}
                {menu && <Menu></Menu>}
        </>
    )
}

// lg:px-20