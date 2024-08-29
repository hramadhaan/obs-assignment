"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import isEqual from "lodash/isEqual";
import DialogCore from "./DialogCore";
import useUserStore from "@/store/UserStore";
import { User } from "@/types/user";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const INITIAL_STATE = {
  id: new Date().getTime(),
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "0",
      lng: "0",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "0",
    bs: "0",
  },
};

type Props = {
  children: ReactNode;
};

const ContentModal = (props: {
  tempUser: User;
  setTempUser: Dispatch<SetStateAction<User>>;
}) => {
  return (
    <div className="flex flex-col items-start gap-y-2">
      <p className="text-sm font-semibold mb-2">Contact Details</p>
      <div className="flex flex-row items-center justify-between gap-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={props.tempUser.name}
            onChange={(e) =>
              props.setTempUser({ ...props.tempUser, name: e.target.value })
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={props.tempUser.username}
            onChange={(e) =>
              props.setTempUser({
                ...props.tempUser,
                username: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={props.tempUser.email}
          onChange={(e) =>
            props.setTempUser({ ...props.tempUser, email: e.target.value })
          }
        />
      </div>

      <div className="flex flex-row items-center justify-between gap-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            placeholder="Phone"
            value={props.tempUser.phone}
            onChange={(e) =>
              props.setTempUser({ ...props.tempUser, phone: e.target.value })
            }
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="website">Website</Label>
          <Input
            type="url"
            id="website"
            placeholder="Website"
            value={props.tempUser.website}
            onChange={(e) =>
              props.setTempUser({
                ...props.tempUser,
                website: e.target.value,
              })
            }
          />
        </div>
      </div>

      <p className="text-sm font-semibold my-2">Address</p>
      <div className="flex flex-row items-center justify-between gap-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="street">Street</Label>
          <Input
            type="text"
            id="street"
            placeholder="Street"
            value={props.tempUser.address.street}
            onChange={(e) =>
              props.setTempUser({
                ...props.tempUser,
                address: {
                  ...props.tempUser.address,
                  street: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="suite">Suite</Label>
          <Input
            type="text"
            id="suite"
            placeholder="Suite"
            value={props.tempUser.address.suite}
            onChange={(e) =>
              props.setTempUser({
                ...props.tempUser,
                address: { ...props.tempUser.address, suite: e.target.value },
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            placeholder="City"
            value={props.tempUser.address.city}
            onChange={(e) =>
              props.setTempUser({
                ...props.tempUser,
                address: { ...props.tempUser.address, city: e.target.value },
              })
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="zipcode">Zip Code</Label>
          <Input
            type="text"
            id="zipcode"
            placeholder="Zip Code"
            value={props.tempUser.address.zipcode}
            onChange={(e) =>
              props.setTempUser({
                ...props.tempUser,
                address: {
                  ...props.tempUser.address,
                  zipcode: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <p className="text-sm font-semibold my-2">Company Detail</p>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="companyname">Company Name</Label>
        <Input
          type="text"
          id="companyname"
          placeholder="Company Name"
          value={props.tempUser.company.name}
          onChange={(e) =>
            props.setTempUser({
              ...props.tempUser,
              company: { ...props.tempUser.company, name: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
};

const LayoutWithModal: FC<Props> = (props) => {
  const { user, resetUser, removeUser, editUser, createUser } = useUserStore();
  const [tempUser, setTempUser] = useState<User>(INITIAL_STATE as User);

  useEffect(() => {
    if (user) setTempUser(user);
  }, [user]);

  const isBlankForm = useMemo(() => {
    if (user) return false;
    return true;
  }, [user]);

  return (
    <main className="flex flex-col items-start py-4 md:px-56 px-2">
      {props.children}
      <DialogCore
        title="Show User"
        primaryActionTitle={isBlankForm ? "Add User" : "Edit User"}
        secondaryActionTitle={isBlankForm ? undefined : "Delete User"}
        description=""
        onClose={() => {
          resetUser();
          setTempUser(INITIAL_STATE as User);
        }}
        onPrimaryAction={() => {
          if (isBlankForm) {
            createUser(tempUser);
          } else {
            editUser(tempUser as User);
          }
          setTempUser(INITIAL_STATE as User);
        }}
        onSecondaryAction={() => {
          removeUser(user as User);
        }}
        content={<ContentModal tempUser={tempUser} setTempUser={setTempUser} />}
      />
    </main>
  );
};

export default LayoutWithModal;
