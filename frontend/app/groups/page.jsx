import GroupsHeader from "@/components/groups/GroupsHeader";
import GroupsList from "@/components/groups/GroupsList";

export default async function Home() {
  return (
    <div className="bg-green-100">
      <GroupsHeader />
      <GroupsList />
    </div>
  );
}