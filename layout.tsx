"use client";

import { Provider } from "react-redux";
import Navigation from "./Navigation";
import store from "./store";

export default function PazzaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Navigation />
      {children}
    </Provider>
  );
}
