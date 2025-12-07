"use client";

import { Provider } from "react-redux";
import Navigation from "./Navigation";
import store from "./store";
import Session from "../(Kambaz)/Account/Session";

export default function PazzaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Session>
        <Navigation />
        {children}
      </Session>
    </Provider>
  );
}
