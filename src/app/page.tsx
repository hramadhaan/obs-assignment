"use client";

import useUserData from "@/hooks/useUserData";
import useUserStore from "@/store/UserStore";
import { useCallback, useEffect } from "react";
import Loading from "@/components/core/Loading";
import ItemList from "@/components/core/ItemList";
import Navbar from "@/components/core/Navbar";
import LayoutWithModal from "@/components/core/LayoutWithModal";
import useDialogStore from "@/store/DialogStore";
import { User } from "@/types/user";

export default function Home() {
  const { data, isLoading } = useUserData();
  const { users, fetchUser, showUser, removeUser} = useUserStore();
  const { handleDialog } = useDialogStore();

  useEffect(() => {
    if (data) {
      fetchUser(data);
    }
  }, [data]);

  const handleChange = useCallback((open: boolean, id: number) => {
    showUser(id);
    setTimeout(() => {
      handleDialog(open);
    }, 200);
  }, []);

  const handleDelete = useCallback((user: User) => {
    removeUser(user);
  }, []);

  return (
    <LayoutWithModal>
      <Navbar />
      <div className="md:h-8 h-4" />
      <Loading isLoading={isLoading} />
      <div className="w-full flex flex-col items-start gap-y-4">
        {/* Item */}
        {users &&
          users.length > 0 &&
          users.map((item, index) => {
            return (
              <ItemList
                key={`user-list-${index}`}
                user={item}
                handleChange={(open, id) => {
                  handleChange(open, id);
                }}
                handleDelete={handleDelete}
              />
            );
          })}
      </div>
    </LayoutWithModal>
  );
}
