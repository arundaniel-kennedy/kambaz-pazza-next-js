"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { storeType } from "./store";

export default function page() {
  const { currentUser } = useSelector(
    (state: storeType) => state.accountReducer
  );
  if (currentUser) return redirect("/Pazza/Class/RS101");
  else return redirect("/Account/Signin?redirect=/Pazza/Class/RS101")
}
