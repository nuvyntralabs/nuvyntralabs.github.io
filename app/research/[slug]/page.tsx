import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { researchProjects } from "@/content/works";
import { WorkDetail } from "@/components/work-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return researchProjects.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = researchProjects.find((item) => item.slug === slug);
  if (!work) return {};

  return {
    title: work.title,
    description: work.description,
    alternates: { canonical: `/research/${work.slug}/` },
  };
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = researchProjects.find((item) => item.slug === slug);
  if (!work) notFound();

  return <WorkDetail work={work} />;
}
