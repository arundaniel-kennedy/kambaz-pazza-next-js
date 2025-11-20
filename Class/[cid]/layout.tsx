import React, { ReactNode } from "react";
import FolderFilter from "./FolderFilter";
import Sidebar from "./Sidebar";

import "./layout.scss";

export default function ClassLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="class-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="rightside-wrapper">
        <div className="folder-filter-wrapper">
          <FolderFilter />
        </div>
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
}
