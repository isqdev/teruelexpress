import { Button, ButtonText, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section } from "@/components";
import { CaretDown, CaretUp, MapPin, Package } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ServicedRoutes() {
  const [cities, setCities] = useState([]);
  const [isMap, setIsMap] = useState(true);

  useEffect(() => {
    fetch('./src/assets/cities.json').
      then(data => data.json()).
      then(data => setCities(data))
  }, []);

  return (
    <div className="relative">
      <div className="bg-white">
        <Section>
          <h2 className="pb-3">Rotas atendidas</h2>
          <p className="pb-3">Aguardando texto produzido por PO, até lá, estará vazio, assim como a contribuição do PO</p>

          <div className="flex justify-evenly font-bold pb-7">
            <p onClick={() => setIsMap(true)} className={isMap ? "border-b-3 border-red-tx" : ""}>Mapa</p>
            <p onClick={() => setIsMap(false)} className={!isMap ? "border-b-3 border-red-tx" : ""}>Ver lista</p>
          </div>

          {isMap ? <Map data={cities} /> : <List data={cities} />}

          <Link to="/login">
            <Button className="bg-red-tx mt-5">
              <Package className="icon text-white"/>
              <ButtonText className="text-white">
                Solicitar orçamento
              </ButtonText>
            </Button>
          </Link>

        </Section>

      </div>
    </div>
  )
}

function CitySearch({ suggestions, title, placeholder }) {
  const [status, setStatus] = useState('default');
  const [inputStyle, setInputStyle] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [returnMessage, setReturnMessage] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

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
    setIsWriting(false);
  };

  return (
    <div className="relative">
      <InputLabel>{title}</InputLabel>
      <InputRoot data-status={status}>
        <InputIcon>
          <MapPin className={`icon ${inputStyle}`}/>
        </InputIcon>
        <InputField value={inputValue} onChange={handleChange} placeholder={placeholder} onFocus={() => setIsWriting(true)} onBlur={() => setIsWriting(false)}/>
      </InputRoot>
      <InputMessage className={inputStyle}>
        {returnMessage ? "Atendemos essa cidade!" : returnMessage === null ? null : "Cidade fora da rota!"}
      </InputMessage>

      {isWriting && <ul className="bg-gray-50 rounded-2xl absolute top-full z-50 w-full">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)} onBlur={() => setIsWriting(false)}>
            <p className="hover:bg-gray-100 hover:cursor-pointer rounded-2xl overflow-hidden pl-5 py-2 "> {suggestion}</p>
          </li>
        ))}
      </ul>}
    </div>
  );
};

function Map({ data }) {
  return (
    <div className="relative">
      <div>
        <CitySearch suggestions={data} title="Cidade de origem" placeholder="Ex: Paranavaí"/>
        <CitySearch suggestions={data} title="Cidade de destino" placeholder="Ex: Maringá"/>
      </div>
    </div>
  )
}

function List({ data }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative">
      <div id="container" className="bg-gray-50 rounded-2xl p-6 font-bold flex flex-col gap-y-4">

        <ul className="space-y-2">
          {data.slice(0, 5).map(city => (
            <li key={data.indexOf(city)}>
              <p className="flex">
                <MapPin className="icon mr-4"/>
                {city}
              </p>
            </li>
          ))}
          {showMore && data.slice(5).map(city => (
            <li key={data.indexOf(city)}>
              <p className="flex">
                <MapPin className="icon mr-4"/>
                {city}
              </p>
            </li>
          ))}
        </ul>

        {<Button className="bg-gray-50" onClick={() => setShowMore(showMore ? false : true)}>
          {showMore ? <CaretUp className="icon" /> : <CaretDown className="icon"/>}
          <ButtonText className="text-black">
            {showMore ? "Mostrar menos" : "Mostrar mais cidades"}
          </ButtonText>
        </Button>}
      </div>
    </div>
  )
}


