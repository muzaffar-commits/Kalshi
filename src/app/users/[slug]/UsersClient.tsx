"use client";

import Users from "@/components/Pages/users/page";

export default function UsersClient({
  userId,
  targetId,
}: {
  userId: string;
  targetId: string;
}) {
  return <Users userId={userId} targetId={targetId} />;
}
