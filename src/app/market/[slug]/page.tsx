import { Suspense } from "react";
import Details from "@/components/Pages/detail/page";
import MarketDetails from "./MarketDetails";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <MarketDetails targetId={params.slug} />
    </Suspense>
  );
}
