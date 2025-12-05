import React from "react";
import Navigation from "./Navigation";

import "./page.scss";
import ClassInfo from "./ClassInfo/ClassInfo";
import QandASettings from "./QandA/QandASettings";
import { Container } from "react-bootstrap";
import ClassFolders from "./ClassFolders/ClassFolders";
import Professors_Tas from "../Enroll/Professors_Tas";

export default function page() {
  return (
    <>
      <Navigation />
      <div className="manage-class-content-wrapper">
        <Container>
          {/* <ClassInfo />
          <QandASettings /> */}
          {/* <ClassFolders /> */}
          <Professors_Tas />
        </Container>
      </div>
    </>
  );
}
