"use client";

import { useParams } from "next/navigation";
import GroupSingleHeader from "@/components/groups/GroupSingleHeader";
import GroupSinglePage from "@/components/groups/GroupSinglePage";

export default function Home() {
  const { id } = useParams();

  return (
    <div className="bg-green-100">
      <GroupSingleHeader group_id={id} />
      <GroupSinglePage group_id={id} />
    </div>
  );
}