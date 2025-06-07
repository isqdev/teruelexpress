import { Button, ButtonText, SectionApp } from "@/components";
import { Package, UserCircle, Truck, Star, WhatsappLogo, ArrowSquareOut, EnvelopeSimple, Cube } from "phosphor-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar"


export function Home() {
  const serviceButtons = [
    {
      to: "/app/orcamento",
      className: "lg:order-1",
      buttonClass: "bg-red-tx",
      icon: <Package size={24} className="text-white" />,
      children: <ButtonText className="text-white">Solicitar orçamento</ButtonText>,
    },
    {
      to: "/app/meus-fretes",
      className: "lg:order-3",
      buttonClass: "bg-white border border-gray-600",
      icon: <Cube size={24} className="text-red-tx" />,
      children: <ButtonText className="text-black">Ver meus fretes</ButtonText>,
    },
    {
      to: "/app/rotas-atendidas",
      className: "lg:order-5",
      buttonClass: "bg-white border border-gray-600",
      icon: <Truck size={24} className="text-red-tx" />,
      children: <ButtonText className="text-black">Ver rotas atendidas</ButtonText>,
    },
    {
      to: "/app/avaliar",
      className: "lg:order-4",
      buttonClass: "bg-white border border-gray-600",
      icon: <Star size={24} className="text-red-tx" />,
      children: <ButtonText className="text-black">Avaliar nosso serviço</ButtonText>,
    },
    {
      to: "#",
      className: "lg:order-6",
      buttonClass: "bg-white border border-gray-600",
      icon: <Star size={24} className="text-red-tx" />,
      children: <ButtonText className="text-black">Ver minhas avaliações</ButtonText>,
    },
    {
      to: "https://wa.me/5544999965596",
      external: true,
      className: "lg:order-7",
      buttonClass: "bg-white border border-gray-600",
      icon: <WhatsappLogo size={24} className="text-red-tx" />,
      arrowOut: true,
      children: <ButtonText className="text-black">WahtsApp 1</ButtonText>,
    },
    {
      to: "https://wa.me/5544920001842",
      external: true,
      className: "lg:order-8",
      buttonClass: "bg-white border border-gray-600",
      icon: <WhatsappLogo size={24} className="text-red-tx" />,
      arrowOut: true,
      children: <ButtonText className="text-black">WahtsApp 2</ButtonText>,
    },
    {
      to: "mailto:teruelexpress.servicos@gmail.com",
      external: true,
      className: "lg:order-2",
      buttonClass: "bg-white border border-gray-600",
      icon: <EnvelopeSimple size={24} className="text-red-tx" />,
      arrowOut: true,
      children: <ButtonText className="text-black">Enviar email</ButtonText>,
    },
  ];

  return (
    <>
      <SectionApp>
        <div className="lg:flex lg:flex-col lg:items-center lg:gap-15 pb-20">
          <div className="hidden lg:flex flex-row items-center w-full">
            <SidebarTrigger />
            <div className="flex-1 flex justify-center">
              <h3 className="text-black">Home</h3>
            </div>
          </div>
          <Button className="bg-gray-100 w-14 h-14 lg:w-60 lg:h-12">
            <UserCircle size={32} className="text-gray-600" />
            <p className="hidden lg:block text-black font-bold">Minha conta</p>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <h3 className="lg:col-span-2 pb-4">Serviços</h3>
          {serviceButtons.map((props, idx) => (
            <ServiceButtonLink key={idx} {...props} />
          ))}
        </div>
      </SectionApp>
    </>
  );
}

function ServiceButtonLink({
  to,
  external = false,
  className = '',
  buttonClass = '',
  icon,
  children,
  arrowOut = false,
}) {
  const linkProps = external
    ? { to, target: '_blank', rel: 'noopener noreferrer' }
    : { to };

  return (
    <Link
      {...linkProps}
      className={className}
    >
      <Button className={buttonClass}>
        {icon}
        {children}
        {arrowOut && (
          <ArrowSquareOut size={24} className="text-gray-600" />
        )}
      </Button>
    </Link>
  );
}