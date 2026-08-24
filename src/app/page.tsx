import { ExperienceGate } from "@/components/experience/ExperienceGate";
import { Industries } from "@/components/industries/Industries";
import { Services } from "@/components/services/Services";
import { Pricing } from "@/components/pricing/Pricing";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Process } from "@/components/process/Process";

export default function Home() {
  return (
    <main>
      <ExperienceGate />
      <Industries />
      <Services />
      <Pricing />
      <Testimonials />
      <Process />
    </main>
  );
}
