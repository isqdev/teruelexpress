import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { data } from "autoprefixer";
import { CaretDown, MapPin, Package } from "phosphor-react";
import { useEffect, useState } from "react";
import { map } from "zod";

export function ServicedRoutes() {

  const [cities, setCities] = useState([]);
  const [isMap, setIsMap] = useState(true);
  const [style, setStyle] = useState('');

  const toggleComponent = () => {
    setIsMap(!isMap);
    setStyle("border-b-3 border-red-tx");
  };

  useEffect(() => {
    fetch('./src/assets/cities.json').
      then(data => data.json()).
      then(data => setCities(data))
  }, []);

  function Map() {
    return (
    <>
      <div className="flex justify-evenly font-bold pb-6">
        <p className="border-b-3 border-red-tx">Mapa</p>
        <p onClick={toggleComponent}>Ver lista</p>
      </div>

      <div>
        <InputLabel>Cidade de origem</InputLabel>
        <InputRoot status="validated">
          <InputIcon>
            <MapPin className="icon" />
          </InputIcon>
          <InputField placeholder="Ex: Paranavaí" />
        </InputRoot>
        <InputMessage>Atendemos essa cidade!</InputMessage>

        <InputLabel>Cidade de destino</InputLabel>
        <InputRoot>
          <InputIcon>
            <MapPin className="icon" />
          </InputIcon>
          <InputField placeholder="Ex: Maringá" />
        </InputRoot>
        <InputMessage>Cidade fora da rota!</InputMessage>
      </div>
    </>
    )
  }

  function List() {
    return (
      <>
        <div className="flex justify-evenly font-bold pb-7">
          <p onClick={toggleComponent}>Mapa</p>
          <p className="border-b-3 border-red-tx">Ver lista</p>
        </div>

        <div id="container" className="bg-gray-50 rounded-2xl p-6 font-bold flex flex-col gap-y-4">
          <ul className="space-y-2">
            {cities.map(city => (
              <li key={cities.indexOf(city)}>
                <p className="flex">
                  <MapPin className="icon mr-4"/>
                  {city}
                </p>
              </li>
            ))}
          </ul>
          <Button className="bg-gray-50">
            <CaretDown className="icon" />
            <ButtonText className="text-black">
              Mostrar mais cidades
            </ButtonText>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="bg-white">
        <Section>
          <h2 className="pb-3">Rotas atendidas</h2>
          <p className="pb-3">Aguardando texto produzido por PO, até lá, estará vazio, assim como a contribuição do PO</p>

          {isMap ? <Map/>: <List/>}

          <Button className="bg-red-tx mt-5">
            <Package className="icon text-white" />
            <ButtonText className="text-white">
              Solicitar orçamento
            </ButtonText>
          </Button>

        </Section>

      </div>
    </>
  );
}
