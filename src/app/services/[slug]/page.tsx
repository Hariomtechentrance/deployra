import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SERVICE_DETAILS,
  getServiceDetail,
} from "@/lib/constants/serviceDetails";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return {};

  return {
    title: `${service.eyebrow} | Deployra`,
    description: service.subheading,
  };
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
