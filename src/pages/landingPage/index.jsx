import { About } from "./About";
import { Budget } from "./Budget";
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
          <Budget />
          <OurClients />
          <Footer />
        </>
    )
}