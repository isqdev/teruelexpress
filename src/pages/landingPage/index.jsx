import { About } from "./About";
import { ServicedRoutes } from "./ServicedRoutes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OurClients } from "./OurClients";
import { Reviews } from "./Reviews";

export function LandingPage() {
    return (
        <>
          <Header />
          <About />
          <Reviews />
          <ServicedRoutes />
          <OurClients />
          <Footer />
        </>
    )
}