import { ExperienceGate } from "@/components/experience/ExperienceGate";
import { Industries } from "@/components/industries/Industries";
import { Services } from "@/components/services/Services";
import { Pricing } from "@/components/pricing/Pricing";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Process } from "@/components/process/Process";
import { getPublicTestimonials } from "@/lib/submissions";

// Re-fetch testimonials at most every 30s so new client reviews show up
// for other visitors without going fully dynamic on every request.
export const revalidate = 30;

export default async function Home() {
  const testimonials = await getPublicTestimonials().catch(() => []);

  return (
    <main>
      <ExperienceGate />
      <Industries />
      <Services />
      <Pricing />
      <Testimonials initialTestimonials={testimonials} />
      <Process />
    </main>
  );
}
