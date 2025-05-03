import React from "react";
import { Outlet } from "react-router";

const adminLayout = () => {
  return (
    <div className="admin-layout">
      MObile sidebar
      <aside className="w-full max-x-[270px] hidden lg:block">sidebar</aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default adminLayout;
