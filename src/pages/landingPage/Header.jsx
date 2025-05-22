import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { useState } from "react";
import { List, Package, X } from "phosphor-react";
import { Link } from "react-router-dom";

export function Header() {
    const [menu, setMenu] = useState(false);

    function Menu() {
    return (
        <>
        <div className="w-65 h-auto bg-white fixed top-5 right-0 rounded-bl-2xl justify-self-end pr-5 pl-5 z-2" >
            <X className="icon mb-4 hover:cursor-pointer" onClick={() => { setMenu(false)}} />
            <div className="flex flex-col">
                <a className="font-bold hover:cursor-pointer" href="#about">Sobre</a>
                <a className="font-bold hover:cursor-pointer" href="#reviews">Avaliações</a>
                <a className="font-bold hover:cursor-pointer" href="#routes">Rotas atendidas</a>
                <a className="font-bold hover:cursor-pointer" href="#clients">Nossos clientes</a>
                <a className="font-bold hover:cursor-pointer" href="#footer">Contato</a>
            </div>
            <div className="flex gap-1 mt-3">
                <Link to="src\pages\authentication\LoginPage.jsx">
                    <Button className="bg-white border-1 border-gray-600 px-0 w-26 h-8 rounded-lg">
                        <ButtonText className="text-black text-xs text-center">
                            Entrar
                        </ButtonText>
                    </Button>
                </Link>
                <Link to="src\pages\authentication\SignUpPage.jsx">
                    <Button className="bg-red-tx px-0 w-26 h-8 rounded-lg">
                        <ButtonText className="text-white text-xs text-center">
                            Criar conta
                        </ButtonText>
                    </Button>
                </Link>
            </div>
            <Link to="src\pages\authentication\LoginPage.jsx">
                <Button className="bg-red-tx mt-2 mb-5 h-8 rounded-lg">
                    <Package className="icon text-white" />
                    <ButtonText className="text-white">
                        Solicitar orçamento
                    </ButtonText>
                </Button>
            </Link>
        </div>
        <div className="fixed bg-black size-lvh z-1 opacity-80"></div>
        </>
    )
}
    return (
        <>
            <header className="px-6 py-2 sm:px-4 md:px-10 mx-auto max-w-495 sticky top-0 bg-white z-1 flex justify-between">
                <Image src="src\assets\logo.jpg" className="w-26" />
                <List className="icon self-center hover:cursor-pointer" onClick={() => { setMenu(true) }} />
            </header>
            {menu && <Menu></Menu>}
        </>
    )
}
