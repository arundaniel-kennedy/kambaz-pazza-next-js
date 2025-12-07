import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "./Navigation";
import ClassInfo from "./ClassInfo/ClassInfo";
import QandASettings from "./QandA/QandASettings";
import ClassFolders from "./ClassFolders/ClassFolders";
import Professors_Tas from "./Enroll/Professors_Tas";

import "./page.scss";

export default function page() {
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
