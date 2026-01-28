import { Suspense } from "react";
import IdeasDetails from "./IdeasDetails";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <IdeasDetails targetId={params.slug} />
    </Suspense>
  );
}
