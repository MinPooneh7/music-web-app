import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

export default function Add() {
  return (
    <Dialog>
      <DialogTrigger>
        <CirclePlus />
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
