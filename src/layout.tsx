import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import MiniPlayer from "./components/mini-player";
import { useIsMobile } from "./hooks/use-is-mobile";

export default function SidebarLayout() {
  const isMobile = useIsMobile({ breakpoint: "xl" });

  if (isMobile) {
    return (
      <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <span>Mobile Not Supported!</span>
      </div>
    );
  }
  return (
    <div className="flex bg-linear-to-r from-primary to-secondary overflow-auto w-screen h-screen">
      <Sidebar />
      <div className="h-full overflow-x-hidden w-full flex justify-between flex-col">
        <div className="overflow-y-auto h-full">
          <Outlet />
        </div>
        <div>
          <MiniPlayer />
        </div>
      </div>
    </div>
  );
}
