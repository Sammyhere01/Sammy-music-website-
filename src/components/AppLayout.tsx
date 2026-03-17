import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <Outlet />
      <RightPanel />
    </div>
  );
};

export default AppLayout;
