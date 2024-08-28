"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useDialogStore from "@/store/DialogStore";
import { Button } from "../ui/button";
import { User } from "@/types/user";

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  onClose?: () => void;
  primaryActionTitle?: string;
  onPrimaryAction?: () => void;
  secondaryActionTitle?: string;
  onSecondaryAction?: () => void;
};

const DialogCore: FC<Props> = (props) => {
  const { isOpen, handleDialog } = useDialogStore();

  if (!isOpen) return null;
  return (
    <Dialog
      onOpenChange={() => {
        handleDialog(false);
        if (props.onClose && typeof props.onClose === "function")
          props.onClose();
      }}
      open={isOpen}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {props.content}
        <DialogFooter>
          {props.secondaryActionTitle && (
            <Button
              type="submit"
              variant={"ghost"}
              onClick={() => {
                if (
                  props.onSecondaryAction &&
                  typeof props.onSecondaryAction === "function"
                ) {
                  props.onSecondaryAction();
                  handleDialog(false);
                }
              }}
              className="text-red-500 hover:text-red-400"
            >
              {props.secondaryActionTitle}
            </Button>
          )}
          <Button
            type="submit"
            onClick={() => {
              if (
                props.onPrimaryAction &&
                typeof props.onPrimaryAction === "function"
              ) {
                props.onPrimaryAction();
                handleDialog(false);
              }
            }}
          >
            {props.primaryActionTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCore;
