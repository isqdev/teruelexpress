import { About } from "./About";
import { ServicedRoutes } from "./ServicedRoutes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OurClients } from "./OurClients";
import { Reviews } from "./Reviews";
import { Budget } from "./Budget";

export function LandingPage() {
    return (
        <>
          <Header />
          <About id="about"/>
          <Reviews />
          <ServicedRoutes />
          <OurClients />
          <Budget />
          <Footer id="footer" />
        </>
    )
}