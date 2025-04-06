"use client";

import { useEffect, useState } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonBubble from "@/components/ui/buttons/ButtonBubble";
import { isAdmin } from "@/util/GroupsManager"; // Make sure this exists and works

export default function GroupHeader({ group_id, user }) {
  const [deleteVisibility, setDeleteVisibility] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (group_id && user?.id) {
        const isUserAdmin = await isAdmin(group_id, user.id);
        setDeleteVisibility(isUserAdmin);
      }
    };
    checkAdminStatus();
  }, [group_id, user]);

  const editGroup = () => {
    console.log("Edit Group TBD...");
  };

  const deleteGroup = () => {
    console.log("Delete Group TBD...");
  };

  return (
    <div className="px-2 py-1 bg-green-400">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-white font-bold text-lg">GROUP</h2>
        <div className="flex space-x-2">
          <ButtonBubble
            callback_function={editGroup}
            button_text={""}
            icon={faEdit}
          />
          {deleteVisibility && (
            <ButtonBubble
              callback_function={deleteGroup}
              button_text={""}
              icon={faTrash}
            />
          )}
        </div>
      </div>
    </div>
  );
}