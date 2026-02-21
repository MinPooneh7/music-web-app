import { createPlayList } from "@/api/playlist/create-playlist";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function CreatePlayList({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const onSetName = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setName(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: () => createPlayList(name),
    onSuccess: () => {
      setName("");
      setIsOpen(false);
      onSuccess();
    },
  });

  const onFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="font-bold items-center justify-center text-2xl text-text truncate">
        New play list +
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onFormSubmit}>
          <input
            className="border-b focus:outline-0 placeholder:text-gray-500 text-lg w-full"
            placeholder="Enter playlist name"
            value={name}
            onChange={onSetName}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
