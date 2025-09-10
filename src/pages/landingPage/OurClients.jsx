import { Section } from "@/components";
import { CloudinaryImage } from "@/components/CloudinaryImage.jsx";

const clientImages = [
  "qqig1hz9xm8fhznflppp",
  "kszayxq1khctkqhczf6c",
  "m9dphpqqqgplpmntwdau",
  "esf8lqfc0vws2bait8is",
  "yq3uwnnq4pr4uga9hiuj",
  "qvklh9g6mvg325fgihpn",
  "h4lotek8hqimtfp5ahvn",
  "ue2mgzbcpi3amqkuwgdm",
  "wlztg64h8cyg01ohrw0q",
  "qzn47tnm8hufj3wme1tl",
];

export function OurClients() {
  return (
    <>
      <>
        <div className="bg-gray-50">
          <Section id="clients">
            <h2>Nossos clientes</h2>
            <p className="mb-4">Confie em quem já escolheu nossos serviços e descubra o caminho para uma logística mais inteligente.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
              {clientImages.map((publicId) => (
                <CloudinaryImage
                  key={publicId}
                  publicId={publicId}
                  className="w-[100px] h-auto"
                />
              ))}
            </div>
          </Section>
        </div>
      </>
    </>
  );
}
