import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { CaretDown, MapPin, Package } from "phosphor-react";

export function ServicedRoutes() {
  return (
    <>
      <div className="bg-white">
        <Section>
          <h2>Rotas atendidas</h2>
          <p>Aguardando texto produzido por PO, até lá, estará vazio, assim como a contribuição do PO</p>
          <div className="flex justify-evenly font-bold">
            <p className="border-b-3 border-red-tx">Mapa</p>
            <p>Ver lista</p>
          </div>
          <div>
            <InputLabel>Cidade de origem</InputLabel>
            <InputRoot>
              <InputIcon>
                <MapPin className="icon"/>
              </InputIcon>
              <InputField placeholder="Ex: Paranavaí"/>
            </InputRoot>
            <InputMessage>Atendemos essa cidade!</InputMessage>
            <InputLabel>Cidade de destino</InputLabel>
            <InputRoot>
              <InputIcon>
                <MapPin className="icon"/>
              </InputIcon>
              <InputField placeholder="Ex: Maringá"/>
            </InputRoot>
            <InputMessage>Cidade fora da rota!</InputMessage>
          </div>
          <Button className="bg-red-tx">
            <Package className="icon text-white"/>
            <ButtonText className="text-white">
              Solicitar orçamento
            </ButtonText>
          </Button>
          <div className="flex justify-evenly font-bold">
            <p>Mapa</p>
            <p className="border-b-3 border-red-tx">Ver lista</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 font-bold flex flex-col gap-y-4">
            <p className="flex">
              <MapPin className="icon mr-4"/> Cidade 1
            </p>
            <p className="flex">
              <MapPin className="icon mr-4"/> Cidade 2
            </p>
            <p className="flex">
              <MapPin className="icon mr-4"/> Cidade 3
            </p>
            <p className="flex">
              <MapPin className="icon mr-4"/> Cidade 4
            </p>
          </div>
          <Button className="bg-red-tx">
            <Package className="icon text-white"/>
            <ButtonText className="text-white">
              Solicitar orçamento
            </ButtonText>
          </Button>
        </Section>
      </div>
    </>
  );
}
