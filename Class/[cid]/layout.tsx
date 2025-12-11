"use client";
import React, { ReactNode, use } from "react";
import FolderFilter from "./FolderFilter";
import Sidebar from "./Sidebar";
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../../store";
import { toggleSidebar } from "./reducer";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import FilterBar from "./Folders/page";

export default function ClassLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const dispatch = useDispatch();
  const showSidebar = useSelector(
    (state: storeType) => state.classReducer.showSidebar
  );
  const handleSidebar = () => {
    dispatch(toggleSidebar(!showSidebar));
  };
  return (
    <div className="class-wrapper">
      {showSidebar && <Sidebar />}
      <div className="fs-4 me-2 sidebar-toggle-icon  ">
        {!showSidebar && (
          <VscTriangleRight
            className="icon-hover"
            title="Close Sidebar"
            onClick={handleSidebar}
          />
        )}
        {showSidebar && (
          <VscTriangleLeft
            className="icon-hover"
            title="Close Sidebar"
            onClick={handleSidebar}
          />
        )}
      </div>
      <div className="rightside-wrapper">
        <div className=" mb-3">
          <FilterBar />
        </div>
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
}
