import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <ProfileClient targetId={params.slug} />
    </Suspense>
  );
}
