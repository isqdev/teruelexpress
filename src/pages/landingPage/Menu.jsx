import { Button, ButtonText } from "@/components";
import { Package, X } from "phosphor-react";

export function Menu() {
    return (
        <>
            <div className="w-66 h-69 bg-white sticky top-1px justify-right">
                <X className="icon"/>
                <p className="font-bold">Sobre</p>
                <p className="font-bold">Avaliações</p>
                <p className="font-bold">Rotas atendidas</p>
                <p className="font-bold">Nossos clientes</p>
                <p className="font-bold">Contato</p>
                <div className="flex gap-1">
                    <Button className="bg-white border-black">
                        <ButtonText className="text-black">
                            Entrar
                        </ButtonText>
                    </Button>
                    <Button className="bg-red-tx">
                        <ButtonText className="text-white">
                            Criar conta
                        </ButtonText>
                    </Button>
                </div>
                <Button className="bg-red-tx mt-2">
                    <Package className="icon text-white" />
                    <ButtonText className="text-white">
                        Solicitar orçamento
                    </ButtonText>
                </Button>
            </div>
        </>
    )
}