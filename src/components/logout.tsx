import { logout } from "@/api/auth/logout";
import { useMutation } from "@tanstack/react-query";
import useStore from "@/store/use-store";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setUser(null);
      navigate("/");
    },
  });
  return (
    <div>
      <button
        onClick={() => mutate()}
        className="text-red-600 text-3xl font-bold border-0 rounded-2xl bg-white/30 px-10 py-2 h-15"
      >
        Log out
      </button>
    </div>
  );
}
