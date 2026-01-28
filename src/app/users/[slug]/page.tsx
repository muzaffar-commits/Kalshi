import { Suspense } from "react";
import UsersClient from "./UsersClient";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <UsersClient targetId={params.slug} />
    </Suspense>
  );
}
