import { deletePlayList } from "@/api/playlist/delete";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";

export default function Delete({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const { mutate } = useMutation({
    mutationFn: () => deletePlayList(id),
    onSuccess: () => {
      onSuccess();
    },
  });

  const onDelete = () => {
    console.log("hi")
    mutate();
  };
  return (
      <button onClick={onDelete}>
        <Trash className="text-red-600"/>
      </button>
  );
}
