import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => (
  <div className="flex">
    <Sidebar className="sticky top-0 left-0 h-full" />
    <div className="flex-1 ">
      <Navbar className="sticky top-0 " />
      <main className=" p-4">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
