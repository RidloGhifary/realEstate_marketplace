import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="mb-4 text-3xl font-bold text-slate-800">
        About UhuyyEstate
      </h1>
      <p className="mb-4 text-slate-700">
        <b>UhuyyEstate</b> Estate is a leading real estate agency that
        specializes in helping clients buy, sell, and rent properties in the
        most desirable neighborhoods. Our team of experienced agents is
        dedicated to providing exceptional service and making the buying and
        selling process as smooth as possible.
      </p>
      <p className="mb-4 text-slate-700">
        Our mission is to help our clients achieve their real estate goals by
        providing expert advice, personalized service, and a deep understanding
        of the local market. Whether you are looking to buy, sell, or rent a
        property, we are here to help you every step of the way.
      </p>
      <p className="mb-4 text-slate-700">
        Our team of agents has a wealth of experience and knowledge in the real
        estate industry, and we are committed to providing the highest level of
        service to our clients. We believe that buying or selling a property
        should be an exciting and rewarding experience, and we are dedicated to
        making that a reality for each and every one of our clients.
      </p>

      <div className="mt-10">
        <h1 className="my-4 text-3xl font-bold text-slate-800">
          Question and Answer
        </h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What services does UhuyyEstate Estate specialize in?
            </AccordionTrigger>
            <AccordionContent>
              UhuyyEstate Estate specializes in helping clients buy, sell, and
              rent properties in desirable neighborhoods.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What sets UhuyyEstate Estate apart from other real estate
              agencies?
            </AccordionTrigger>
            <AccordionContent>
              Our team of experienced agents is dedicated to providing
              exceptional service and making the buying and selling process as
              smooth as possible. We offer expert advice, personalized service,
              and a deep understanding of the local market to help clients
              achieve their real estate goals.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How does UhuyyEstate Estate assist clients in achieving their real
              estate goals?
            </AccordionTrigger>
            <AccordionContent>
              We provide expert advice, personalized service, and a deep
              understanding of the local market to help clients buy, sell, or
              rent properties. Our team of agents is committed to making the
              real estate experience exciting and rewarding for each client.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What can clients expect from UhuyyEstate Estate&lsquo;s team of
              agents?
            </AccordionTrigger>
            <AccordionContent>
              Clients can expect a wealth of experience and knowledge in the
              real estate industry from our team of agents. We are dedicated to
              providing the highest level of service and making the buying or
              selling process as smooth as possible.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
