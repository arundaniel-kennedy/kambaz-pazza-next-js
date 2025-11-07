import React, { ReactNode } from "react";
import FolderFilter from "./FolderFilter";
import Sidebar from "./Sidebar";

export default function ClassLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <Sidebar />
      <FolderFilter />
      {children}
    </div>
  );
}
