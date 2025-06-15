import {
  Button,
  ButtonText,
  SectionApp,
  Shape,
  CloudinaryImage,
} from "@/components";
import {
  Package,
  UserCircle,
  Truck,
  Star,
  WhatsappLogo,
  ArrowSquareOut,
  EnvelopeSimple,
  Cube,
  List,
  FolderSimpleStar,
  ClipboardText,
  Gear,
} from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const toggleWhatsApp = () => setShowWhatsApp((prev) => !prev);

  const serviceButtons = [
    {
      to: "/app/orcamento",
      className: "lg:order-1",
      buttonClass: "bg-red-tx",
      icon: <Package className="text-white icon" />,
      children: (
        <ButtonText className="text-white">Solicitar orçamento</ButtonText>
      ),
    },
    {
      to: "/app/minhas-solicitacoes",
      className: "lg:order-3",
      buttonClass: "bg-white border border-gray-600",
      icon: <ClipboardText className="text-red-tx icon" />,
      children: (
        <ButtonText className="text-black">Ver minhas solicitações</ButtonText>
      ),
    },
    {
      to: "/app/rotas-atendidas",
      className: "lg:order-5",
      buttonClass: "bg-white border border-gray-600",
      icon: <Truck className="text-red-tx icon" />,
      children: (
        <ButtonText className="text-black">Ver rotas atendidas</ButtonText>
      ),
    },
  ];

  const getDayPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "bom dia";
    if (hour >= 12 && hour < 18) return "boa tarde";
    return "boa noite";
  };

  const reviewButtons = [
    {
      to: "/app/avaliar",
      className: "lg:order-4",
      buttonClass: "bg-white border border-gray-600",
      icon: <Star className="text-red-tx icon" />,
      children: (
        <ButtonText className="text-black">Avaliar nosso serviço</ButtonText>
      ),
    },
    {
      to: "/app/minhas-avaliacoes",
      className: "lg:order-6",
      buttonClass: "bg-white border border-gray-600",
      icon: <FolderSimpleStar className="text-red-tx icon" />,
      children: (
        <ButtonText className="text-black">Ver minhas avaliações</ButtonText>
      ),
    },
  ];

  return (
    <SectionApp>
      <div className="max-w-sm sm:max-w-lg lg:max-w-3xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="items-center flex justify-center w-full">
            <CloudinaryImage
              publicId={"ndmrywtuuk65gxfo8onn"}
              className="w-48 sm:w-58 h-auto "
            />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-black pb-10 text-2xl sm:text-4xl font-heading">
              Olá, {getDayPeriod()} João!
            </span>
          </div>
        </div>
        <div className="rounded-2xl px-3 py-2 sm:p-3 gap-x-2 flex items-center mb-5 shadow-sm drop-shadow-primary border-gray-50 xs:border-1 text-black ">
          <UserCircle size={48}/>
          <div className="flex flex-col w-full">
            <span className="font-heading text-sm text-gray-600">Pessoa física</span>
            <span className="font-heading text-xl">João Silva</span>
          </div>
          <Gear className="icon hover:cursor-pointer"/>
        </div>
        <div className="grid grid-cols-1 gap-y-5 gap-x-5 lg:grid-cols-2">
          <Shape className="p-0 xs:p-4 sm:p-4 xl:p-6 xs:shadow-sm drop-shadow-primary border-gray-50 xs:border-1">
            <h4 className="lg:col-span mb-4">Frete</h4>
            <div className="grid grid-cols-1 gap-3 lg:gap-6">
              {serviceButtons.map((props, idx) => (
                <ServiceButtonLink key={idx} {...props} />
              ))}
            </div>
          </Shape>
          <Shape className="p-0 xs:p-4 sm:p-4 xl:p-6 xs:shadow-sm drop-shadow-primary border-gray-50 xs:border-1">
            <h4 className="lg:col-span mb-4">Outros</h4>
            <div className="grid grid-cols-1 gap-3 lg:gap-6">
              {reviewButtons.map((props, idx) => (
                <ServiceButtonLink key={idx} {...props} />
              ))}
            </div>
          </Shape>
        </div>
      </div>
      <div className="fixed right-2 bottom-2 sm:right-8 sm:bottom-8 space-y-2 sm: space-y-4">
        {showWhatsApp && <WhatsAppNumbers toggle={toggleWhatsApp}/>}
        <div className="flex gap-2 sm:gap-4 justify-end">
          <Button className="size-12 flex justify-around sm:size-16 sm:aspect-square bg-blue-500  ">
            <EnvelopeSimple size={36} className="text-white" />
          </Button>
          <Button className="size-12 flex justify-around sm:size-16 sm:aspect-square bg-success-base  " onClick={toggleWhatsApp}>
            <WhatsappLogo size={36} className="text-white" />
          </Button>
        </div>
      </div>
    </SectionApp>
  );
}

function WhatsAppNumbers({ toggle }) {
  return (
    <div className=" flex flex-col gap-y-2" >
      <Link to="https://wa.me/5544999965596" target="_blank" >
      <Button className="flex w-50  bg-success-base text-white" onClick={toggle}>
        <WhatsappLogo className="icon " />
        <ButtonText>WhatsApp 1</ButtonText>
      </Button>
      </Link> 
      <Link to="https://wa.me/5544920001842" target="_blank" >
      <Button className="flex w-50  bg-success-base text-white" onClick={toggle}>
        <WhatsappLogo className="icon " />
        <ButtonText>WhatsApp 2</ButtonText>
      </Button>
      </Link>
    </div>
  );
}

function ServiceButtonLink({
  to,
  external = false,
  className = "",
  buttonClass = "",
  icon,
  children,
  arrowOut = false,
}) {
  const linkProps = external
    ? { to, target: "_blank", rel: "noopener noreferrer" }
    : { to };

  return (
    <Link {...linkProps} className={className}>
      <Button className={buttonClass}>
        {icon}
        {children}
        {arrowOut && <ArrowSquareOut className="text-gray-600 icon" />}
      </Button>
    </Link>
  );
}
