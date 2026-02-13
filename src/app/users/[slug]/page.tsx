import { Suspense } from "react";
import UsersClient from "./UsersClient";
import GlobalLoader from "@/components/common/Loader";
import AuthGuard from "@/components/AuthGuard";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <AuthGuard>
        <UsersClient targetId={params.slug} />
      </AuthGuard>
    </Suspense>
  );
}
