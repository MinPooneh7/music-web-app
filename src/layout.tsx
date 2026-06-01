import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";

export default function SidebarLayout() {
  return (
    <div className="flex bg-linear-to-r from-primary to-secondary overflow-auto w-screen h-screen">
      <Sidebar />
      <div className="h-full overflow-y-auto overflow-x-hidden w-full">
        <Outlet />
      </div>
    </div>
  );
}
