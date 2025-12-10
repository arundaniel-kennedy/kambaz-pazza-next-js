"use client";

import { Nav, Navbar } from "react-bootstrap";

import PazzaLogo from "./PazzaLogo";

import "./Navigation.scss";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { storeType } from "./store";

export default function Navigation() {
  const { cid } = useParams();
  const path = usePathname();
  const { currentUser } = useSelector(
    (state: storeType) => state.accountReducer
  );
  return (
    <Navbar expand="lg" className="px-2 main-nav">
      <Navbar.Brand href="#home">
        <PazzaLogo width={"90px"} className="mt-2" />
      </Navbar.Brand>
      <div>Web Dev - CS5100</div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav mx-auto">
        <Nav className="mx-auto gap-4">
          <Nav.Link as={Link} href={`/Pazza/Class/${cid}`} active={path.endsWith(`Class/${cid}`)}>
            Q&A
          </Nav.Link>
          {["FACULTY", "TA"].includes(currentUser?.role ?? "") ? (
            <Nav.Link as={Link} href={`/Pazza/ConfigureClasses/${cid}`}>
              Manage Class
            </Nav.Link>
          ) : (
            ""
          )}
        </Nav>
      </Navbar.Collapse>
      <div className="nav-user-pill">Arun Daniel</div>
    </Navbar>
  );
}
