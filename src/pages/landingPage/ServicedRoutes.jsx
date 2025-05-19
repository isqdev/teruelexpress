import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { data } from "autoprefixer";
import { CaretDown, MapPin, Package } from "phosphor-react";
import { useEffect, useState } from "react";
import { map } from "zod";

export function ServicedRoutes() {

  const [cities, setCities] = useState([]);
  const [isMap, setIsMap] = useState(true);

  function toggleComponent() {
    setIsMap(!isMap);
  };

  useEffect(() => {
    fetch('./src/assets/cities.json').
      then(data => data.json()).
      then(data => setCities(data))
  }, []);


  const Autocomplete = ({ suggestions, title, placeholder }) => {
    const [status, setStatus] = useState('default');
    const [inputStyle, setInputStyle] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState(''); 
    const [returnMessage, setReturnMessage] = useState(null); 

    function check(status) {
      if (status === "error") {
        setStatus(status);
        setInputStyle("text-danger-base");
        setReturnMessage(false);
      }
      else if (status === "validated") {
        setStatus(status);
        setInputStyle("text-success-base");
        setReturnMessage(true);
      }
      else {
        setStatus("default");
        setInputStyle("");
        setReturnMessage(null);
    }
  }

    const handleChange = (event) => {
      const inputValue = event.target.value;
      setInputValue(inputValue);
      check();

      const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (filteredSuggestions.length === 0) check("error");
      setFilteredSuggestions(filteredSuggestions);
    };
    const handleSelect = (value) => {
      check("validated");
      setInputValue(value);
      setFilteredSuggestions([]);
    };

    return (
      <>
      <InputLabel>{title}</InputLabel>
        <InputRoot data-status={status}>
          <InputIcon>
            <MapPin className={`icon ${inputStyle}`}/>
          </InputIcon>
          <InputField value={inputValue} onChange={handleChange} placeholder={placeholder}/>
        </InputRoot>
        <InputMessage className={inputStyle}>{returnMessage ? "Atendemos essa cidade!" : returnMessage === null ? null : "Cidade fora da rota!"}</InputMessage>

        <ul className="autocomplete-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      </>
    );
  };

  function Map() {
    return (
      <>
        <div>
          <Autocomplete suggestions={cities} title="Cidade de origem" placeholder="Ex: Paranavaí"/>
          <Autocomplete suggestions={cities} title="Cidade de destino" placeholder="Ex: Maringá"/>
        </div>
      </>
    )
  }

  function List() {
    const showMoreCities = () => {
      console.log(cities);
      for (let i = 0; i < 5; i++) {
        }
      } 

    return (
      <>
        <div id="container" className="bg-gray-50 rounded-2xl p-6 font-bold flex flex-col gap-y-4">
          <ul className="space-y-2">
            {cities.map(city => (
              <li key={cities.indexOf(city)}>
                <p className="flex">
                  <MapPin className="icon mr-4" />
                  {city}
                </p>
              </li>
            ))}
          </ul>
          <Button className="bg-gray-50" onClick={showMoreCities}>
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
          
          <div className="flex justify-evenly font-bold pb-7">
            <p onClick={toggleComponent} className={isMap ? "border-b-3 border-red-tx" : ""}>Mapa</p>
            <p onClick={toggleComponent} className={!isMap ? "border-b-3 border-red-tx" : ""}>Ver lista</p>
          </div>

          {isMap ? <Map /> : <List />}

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
