import { Suspense } from "react";
import IdeasDetails from "./IdeasDetails";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <IdeasDetails targetId={slug} />
    </Suspense>
  );
}
