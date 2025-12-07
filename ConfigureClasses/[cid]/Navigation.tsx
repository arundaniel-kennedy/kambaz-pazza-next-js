"use client";

import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

import "./Navigation.scss"

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-secondary manage-class-nav">
      <Nav.Link href="#BasicInformation" className="active">General <br /> Settings</Nav.Link>
      <Nav.Link href="#QnASettings">Customize <br /> Q&A</Nav.Link>
      <Nav.Link href="#FoldersSettings">Manage <br /> Folders</Nav.Link>
      <Nav.Link href="#BasicInformation">Manage <br /> Enrollment</Nav.Link>
      <Nav.Link href="#BasicInformation">Create <br /> Groups</Nav.Link>
      <Nav.Link href="#BasicInformation">Customize <br /> Course Page</Nav.Link>
      <Nav.Link href="#BasicInformation">Pazza Network <br /> Settings</Nav.Link>
    </Navbar>
  )
}
