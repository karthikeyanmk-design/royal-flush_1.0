import SportClient from "./client";

export function generateStaticParams() {
  return [
    "soccer", "tennis", "basketball", "football", "hockey",
    "cricket", "mma", "golf", "esports",
  ].map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SportClient slug={slug} />;
}
