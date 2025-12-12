"use client";

import { Nav, Navbar } from "react-bootstrap";

import PazzaLogo from "./PazzaLogo";

import "./Navigation.scss";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { storeType } from "./store";

import * as KambazClient from "../(Kambaz)/Courses/client";
import { useEffect, useState } from "react";

export default function Navigation() {
    const { cid } = useParams();
    const path = usePathname();
    const { currentUser } = useSelector(
        (state: storeType) => state.accountReducer
    );
    const [course_name, setCourseName] = useState("");
    const getAllCourses = async () => {
        const courses = await KambazClient.fetchAllCourses();
        const current_course = courses.filter((c: any) => c._id === cid);
        console.log(current_course);
        setCourseName(`${current_course[0]?.name} - ${current_course[0]?._id}`);
    };
    useEffect(() => {
        getAllCourses();
    }, []);
    return (
        <Navbar expand="lg" className="px-2 main-nav">
            <Navbar.Brand href={`/Pazza/Class/${cid}`}>
                <PazzaLogo width={"90px"} className="mt-2" />
            </Navbar.Brand>
            <div>{course_name}</div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav mx-auto">
                <Nav className="mx-auto gap-4">
                    <Nav.Link
                        as={Link}
                        href={`/Pazza/Class/${cid}`}
                        active={path.includes(`Class/${cid}`)}
                    >
                        Q&A
                    </Nav.Link>
                    {["FACULTY", "TA"].includes(currentUser?.role ?? "") ? (
                        <Nav.Link
                            as={Link}
                            href={`/Pazza/ConfigureClasses/${cid}`}
                        >
                            Manage Class
                        </Nav.Link>
                    ) : (
                        ""
                    )}
                </Nav>
            </Navbar.Collapse>
            <div className="nav-user-pill">
                {currentUser?.firstName} {currentUser?.lastName}
            </div>
        </Navbar>
    );
}
