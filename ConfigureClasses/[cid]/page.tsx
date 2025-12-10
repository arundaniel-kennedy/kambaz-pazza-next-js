"use client";

import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "./Navigation";
import ClassInfo from "./ClassInfo/ClassInfo";
import QandASettings from "./QandA/QandASettings";
import ClassFolders from "./ClassFolders/ClassFolders";
import Professors_Tas from "./Enroll/Professors_Tas";

import "./page.scss";
import { useSelector } from "react-redux";
import { storeType } from "../../store";
import { redirect, useParams } from "next/navigation";

export default function page() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: storeType) => state.accountReducer
  );
  if (!currentUser)
    redirect(`/Account/Signin?redirect=/Pazza/ConfigureClasses/${cid}`);
  return (
    <>
      <Navigation />
      <div className="manage-class-content-wrapper">
        <Container>
          <ClassInfo />
          <QandASettings />
          <ClassFolders />
          <Professors_Tas />
        </Container>
      </div>
    </>
  );
}
