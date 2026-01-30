import { Suspense } from "react";
import MarketDetails from "./MarketDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <MarketDetails targetId={slug} />
    </Suspense>
  );
}
