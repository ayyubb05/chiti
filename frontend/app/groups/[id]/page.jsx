import GroupSingleHeader from "@/components/groups/GroupSingleHeader";
import GroupSinglePage from "@/components/groups/GroupSinglePage";

export default function Home({ params }) {
  const group_id = params.id;

  return (
    <div className="bg-green-100">
      <GroupSingleHeader group_id={group_id} />
      <GroupSinglePage group_id={group_id} />
    </div>
  );
}