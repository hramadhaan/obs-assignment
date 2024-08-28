"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import useDialogStore from "@/store/DialogStore";
import useUserStore from "@/store/UserStore";

const Navbar = () => {
  const { handleDialog } = useDialogStore();
  const { resetUser } = useUserStore();
  return (
    <header className="w-full md:p-4 p-2 rounded-md flex flex-row items-center justify-between border-b drop-shadow-sm bg-white">
      <h1 className="md:text-2xl text-xl font-bold">User List</h1>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          resetUser();
          setTimeout(() => {
            handleDialog(true);
          }, 150);
        }}
      >
        <CirclePlus className="md:size-6 size-5" />
      </Button>
    </header>
  );
};

export default Navbar;
