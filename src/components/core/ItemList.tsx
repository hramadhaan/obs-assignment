"use client";

import { FC, memo } from "react";
import { Button } from "../ui/button";
import AvatarCore from "./AvatarCore";
import { User } from "@/types/user";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

type Props = {
  user: User;
  handleChange: (open: boolean, id: number) => void;
  handleDelete: (user: User) => void;
};

const ItemList: FC<Props> = (props) => {
  return (
    <div className="w-full p-3 flex flex-row items-center border rounded-md drop-shadow-sm bg-white gap-x-1">
      {/* User Detail */}
      <div className="flex flex-row items-center gap-x-4 flex-1">
        <AvatarCore
          src="https://picsum.photos/200"
          alt="avatar"
          name="Hanif Ramadhan"
        />
        <div className="flex flex-col items-start">
          <p className="font-semibold">{props.user.name}</p>
          <p className="text-gray-500 text-xs lowercase">
            @{props.user.username}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="md:flex hidden flex-row items-center gap-x-4 flex-1">
        <div className="flex flex-col items-start">
          <p className="font-semibold">{props.user.address.street}</p>
          <p className="text-gray-500 text-xs">Address</p>
        </div>
      </div>

      {/* Job */}
      <div className="md:flex hidden flex-row items-center gap-x-4 flex-1">
        <div className="flex flex-col items-start">
          <p className="font-semibold">{props.user.company.name}</p>
          <p className="text-gray-500 text-xs">Company</p>
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-row items-center md:gap-x-4 gap-x-2">
        <Button
          size={"sm"}
          onClick={() => {
            props.handleChange(true, props.user.id);
          }}
        >
          <EyeIcon className="size-3 md:mr-2" />
          Detail
        </Button>
        <Button onClick={() => props.handleDelete(props.user)} className="bg-red-500 hover:bg-red-400" size={"sm"}>
          <TrashIcon className="size-3 md:mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default memo(ItemList, (prev, next) => prev.user === next.user);
