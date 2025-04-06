"use client";

import { useState } from "react";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonBubble from "@/components/ui/buttons/ButtonBubble";
import SearchBar from "@/components/groups/SearchBar";
import CreateGroupForm from "@/components/groups/CreateGroupForm";

export default function GroupsHeader({ onSearchToggle, onCreateGroupToggle }) {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [createGroupVisibility, setCreateGroupVisibility] = useState(false);

  const toggleSearchVisibility = () => {
    setCreateGroupVisibility(false);
    setSearchVisibility((prev) => !prev);
    onSearchToggle && onSearchToggle(!searchVisibility);
  };

  const toggleCreateGroupVisibility = () => {
    setSearchVisibility(false);
    setCreateGroupVisibility((prev) => !prev);
    onCreateGroupToggle && onCreateGroupToggle(!createGroupVisibility);
  };

  return (
    <div className="px-2 py-1 bg-green-400">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-white font-bold text-lg">GROUPS</h2>

        <div className="flex space-x-2"> 
          <ButtonBubble
            callback_function={toggleSearchVisibility}
            button_text={""}
            icon={faSearch}
          />
          <ButtonBubble
            callback_function={toggleCreateGroupVisibility}
            button_text={""}
            icon={faPlus}
          />
        </div>
      </div>

      {searchVisibility && <SearchBar />}
      {createGroupVisibility && <CreateGroupForm />}
    </div>
  );
}