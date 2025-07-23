import { About } from "./About";
import { ServicedRoutes } from "./ServicedRoutes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OurClients } from "./OurClients";
import { Reviews } from "./Reviews";
import { Budget } from "./Budget";
import { WhatsappLogo } from "phosphor-react";
import { Button, ButtonText } from "@/components";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LandingPage() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const toggleWhatsApp = () => setShowWhatsApp((prev) => !prev);

  return (
    <>
      <Header />
      <Budget />
      <ServicedRoutes />
      <Reviews />
      <About />
      <OurClients />
      <Footer />
      <div className="fixed right-2 bottom-2 sm:right-4 sm:bottom-4">

      {showWhatsApp && <WhatsAppNumbers toggle={toggleWhatsApp}/>}
      <Button className="size-12 flex justify-around sm:size-16 sm:aspect-square shadow justify-self-end mt-2 bg-gray-25  " onClick={toggleWhatsApp} >
          <WhatsappLogo size={48} className="text-success-base" />
      </Button>
      </div>
    </>
  )
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