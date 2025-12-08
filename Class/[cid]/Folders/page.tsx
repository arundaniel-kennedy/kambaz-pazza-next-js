"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { storeType } from "../../../store";
import { setSelectedIndex } from "./reducer";
import "../../app/styles.css";
export default function FilterBar() {
  const items = useSelector((state: storeType) => state.filter.items);
  const selectedIndex = useSelector(
    (state: storeType) => state.filter.selectedIndex
  );
  const dispatch = useDispatch();

  return (
    <div
      id="pazza-main"
      className="flex items-center gap-3 bg-[#1a4d7a] overflow-x-auto"
    >
      {items.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => dispatch(setSelectedIndex(index))}
          className={`flex items-center gap-3 rounded ${
            selectedIndex === index ? "border-2 border-white bg-white/30" : ""
          }`}
        >
          <span className="text-sm font-medium text-white pl-4">
            {item.label}
          </span>
          {item.count !== undefined && (
            <span
              className={`rounded-full text-xs p-1 text-center ${
                selectedIndex === index
                  ? "bg-[#1a4d7a] text-white"
                  : "bg-white text-[#1a4d7a]"
              }`}
            >
              {item.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
