"use client";

import { FC, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  src: string;
  alt: string;
  name: string;
};
const AvatarCore: FC<Props> = (props) => {
  const aliasName = useMemo(() => {
    const name = props.name.split(" ");
    if (name.length > 1) {
      return name[0][0] + name[1][0];
    }
    return name[0][0];
  }, []);

  return (
    <Avatar>
      <AvatarImage src={props.src} alt={props.alt} />
      <AvatarFallback>{aliasName}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCore;
