"use client";

import { FC } from "react";

type Props = {
  isLoading: boolean;
};

const Loading: FC<Props> = (props) => {
  if (props.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full size-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return null;
};

export default Loading;
