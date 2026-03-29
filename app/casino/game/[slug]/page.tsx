"use client";
import { use } from "react";
import CasinoGame from "@/views/CasinoGame";
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <CasinoGame slug={slug} />;
}
