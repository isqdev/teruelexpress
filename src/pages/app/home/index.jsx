import { Button, ButtonText, SectionApp } from "@/components";
import { Package, UserCircle, Truck, Star, WhatsappLogo, ArrowSquareOut, EnvelopeSimple, Cube, List, FolderSimpleStar, ClipboardText } from "phosphor-react";
import { Link } from "react-router-dom";

export function Home() {
  const serviceButtons = [
    {
      to: "/app/orcamento",
      className: "lg:order-1",
      buttonClass: "bg-red-tx",
      icon: <Package className="text-white icon" />,
      children: <ButtonText className="text-white">Solicitar orçamento</ButtonText>,
    },
    {
      to: "/app/minhas-solicitacoes",
      className: "lg:order-3",
      buttonClass: "bg-white border border-gray-600",
      icon: <ClipboardText className="text-red-tx icon" />,
      children: <ButtonText className="text-black">Ver minhas Solicitações</ButtonText>,
    },
    {
      to: "/app/rotas-atendidas",
      className: "lg:order-5",
      buttonClass: "bg-white border border-gray-600",
      icon: <Truck className="text-red-tx icon" />,
      children: <ButtonText className="text-black">Ver rotas atendidas</ButtonText>,
    },
    {
      to: "/app/avaliar",
      className: "lg:order-4",
      buttonClass: "bg-white border border-gray-600",
      icon: <Star className="text-red-tx icon" />,
      children: <ButtonText className="text-black">Avaliar nosso serviço</ButtonText>,
    },
    {
      to: "/app/minhas-avaliacoes",
      className: "lg:order-6",
      buttonClass: "bg-white border border-gray-600",
      icon: <FolderSimpleStar className="text-red-tx icon" />,
      children: <ButtonText className="text-black">Ver minhas avaliações</ButtonText>,
    },
    {
      to: "https://wa.me/5544999965596",
      external: true,
      className: "lg:order-7",
      buttonClass: "bg-white border border-gray-600",
      icon: <WhatsappLogo className="text-red-tx icon" />,
      arrowOut: true,
      children: <ButtonText className="text-black">WhatsApp 1</ButtonText>,
    },
    {
      to: "https://wa.me/5544920001842",
      external: true,
      className: "lg:order-8",
      buttonClass: "bg-white border border-gray-600",
      icon: <WhatsappLogo className="text-red-tx icon" />,
      arrowOut: true,
      children: <ButtonText className="text-black">WhatsApp 2</ButtonText>,
    },
    {
      to: "mailto:teruelexpress.servicos@gmail.com",
      external: true,
      className: "lg:order-2",
      buttonClass: "bg-white border border-gray-600",
      icon: <EnvelopeSimple className="text-red-tx icon" />,
      arrowOut: true,
      children: <ButtonText className="text-black">Enviar email</ButtonText>,
    },
  ];

  return (
    <>
      <SectionApp>
        <div className="max-w-sm sm:max-w-lg lg:max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-10 lg:gap-15 pb-20">
            <div className="items-center w-full">
              <div className="flex-1 flex justify-center">
                <h3 className="text-black">Página inicial</h3>
              </div>
            </div>
            <Button className="bg-gray-100 w-60 h-12">
              <UserCircle className="text-gray-600 icon" />
              <p className="text-black font-bold">Minha conta</p>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:gap-6 lg:grid-cols-2">
            <h4 className="lg:col-span-2">Serviços</h4>
            {serviceButtons.map((props, idx) => (
              <ServiceButtonLink key={idx} {...props} />
            ))}
          </div>
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
          <ArrowSquareOut className="text-gray-600 icon" />
        )}
      </Button>
    </Link>
  );
}