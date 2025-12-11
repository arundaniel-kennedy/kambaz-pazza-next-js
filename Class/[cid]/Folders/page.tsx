"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { storeType } from "../../../store";
import { setFolders, setSelectedIndex } from "./reducer";
import { setPosts } from "../reducer";
import {getPostsForFilter,getFolders} from "../client"
import "./page.scss";
import { useParams } from "next/navigation";

export default function FilterBar() {
  
  const selectedIndex = useSelector(
    (state: storeType) => state.filter.selectedIndex
  );
  const dispatch = useDispatch();
  const { cid } = useParams();
  useEffect(() => {
    async function fetchFolders() {
      try {
        const folders = await getFolders(); 
        console.log("folders from API", folders);
        dispatch(setFolders(folders));
      } catch (err) {
        console.error("Failed to fetch folders", err);
        dispatch(setFolders([]));
      }
    }
    fetchFolders();
  }, [dispatch]);
  
  const items = useSelector((state: storeType) => state.filter.items) ?? [];

  async function handleFolderClick(index: number, item: any) {
    dispatch(setSelectedIndex(index));
    try {
      const posts = await getPostsForFilter(cid as string, item._id);
      dispatch(setPosts(posts));
    } catch (err) {
      console.error("Failed to fetch posts for folder", err);
    }
  }

   return (
    <div className="pazza-folder-bar d-flex align-items-center gap-3 overflow-auto ">
      {items.map((item: any, index: number) => (
        <div
          key={item._id ?? index}
          onClick={() => handleFolderClick(index, item)}
          className={
            "folder-chip d-flex align-items-center gap-2 rounded-pill border " +
            (selectedIndex === index ? "folder-chip-active" : "")
          }
        >
          <span className="folder-chip__label">
            {item.name}
          </span>
          {item.count !== undefined && (
            <span className="folder-chip__count">
              {item.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
