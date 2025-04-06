"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonBubble from "@/components/ui/buttons/ButtonBubble";

function Component1() {
  return (
    <div className="w-full my-2 ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default function Home() {
  const [var1, setVar1] = useState(false);
  const [var2, setVar2] = useState(false);

  const func1 = () => {
    setVar1((prev) => !prev);
    setVar2(false);
  };

  const func2 = () => {
    setVar1(false);
    setVar2((prev) => !prev);
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="px-2 py-1 bg-green-400">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">DASHBOARD</h2>
          <div className="flex space-x-2"> 
            <ButtonBubble
              callback_function={func1}
              button_text={""}
              icon={faSearch}
            />
            <ButtonBubble
              callback_function={func2}
              button_text={""}
              icon={faPlus}
            />
          </div>
        </div>

      {var1 && <Component1 />}
      {var2 && <Component1 />}
      </div>

    </>
  );
}

