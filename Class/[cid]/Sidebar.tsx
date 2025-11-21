"use client";
import React from "react";
import "./sidebar.scss";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormControl,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GoTriangleDown } from "react-icons/go";

export default function Sidebar() {
  const { cid } = useParams();
  return (
    <div className="sidebar-wrapper">
      {/* Sidebar Buttons */}
      <div className="sidebar-buttons ">
        <Button className="new-post-button ">New Post</Button>
        <div className="search-icon fs-4">
          <CiSearch />
        </div>
        <FormControl className="search-bar" placeholder="Search posts..." />
      </div>
      <div className="posts-feed">
        {/* Dropdown For All Posts */}
        <div className="all-posts-dropdown">
          <Dropdown>
            <DropdownToggle variant="light">All Posts</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>All</DropdownItem>
              <DropdownItem>Instructor</DropdownItem>
              <DropdownItem>Student</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* All Posts */}
        <div className="posts-list mt-3 ms-3">
          <ListGroup className="posts-list-group">
            <ListGroupItem className="post-category-today">
              <span className="post-today-cursor">
                Today
                <GoTriangleDown />
              </span>
              <ListGroup>
                <Link
                  href={`/Pazza/Class/${cid}/Posts/123`}
                  className="post-link"
                >
                  <ListGroupItem className="post-item">
                    <div className="post-time float-end">Time</div>
                    <strong>Post Title 1</strong> <br />
                    <small>Post Description</small>
                  </ListGroupItem>
                </Link>
              </ListGroup>
            </ListGroupItem>

            <ListGroupItem className="post-category-yesterday">
              <span className="post-yesterday-cursor">Yesterday</span>{" "}
              <GoTriangleDown />
              <ListGroup>
                <Link
                  href={`/Pazza/Class/${cid}/Posts/124`}
                  className="post-link"
                >
                  <ListGroupItem className="post-item">
                    <div className="post-time float-end">Time</div>
                    <strong>Post Title 2</strong> <br />
                    <small>Post Description</small>
                  </ListGroupItem>
                </Link>
              </ListGroup>
            </ListGroupItem>

            <ListGroupItem className="post-category-yesterday">
              <span className="post-yesterday-cursor">Last Week</span>{" "}
              <GoTriangleDown />
              <ListGroup>
                <Link
                  href={`/Pazza/Class/${cid}/Posts/125`}
                  className="post-link"
                >
                  <ListGroupItem className="post-item">
                    <div className="post-time float-end">Time</div>
                    <strong>Post Title 3</strong> <br />
                    <small>Post Description 3</small>
                  </ListGroupItem>
                </Link>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
