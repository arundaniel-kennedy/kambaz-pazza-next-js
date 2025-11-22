"use client";
import React, { useState } from "react";
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
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GoTriangleDown } from "react-icons/go";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Sidebar() {
  const [togglePostsToday, setTogglePostsToday] = useState(true);
  const [togglePostsYesterday, setTogglePostsYesterday] = useState(true);
  const [togglePostsLastWeek, setTogglePostsLastWeek] = useState(true);
  const [togglePostsDateWeek, setTogglePostsDateWeek] = useState(true);
  const { cid } = useParams();
  return (
    <div className="sidebar-wrapper">
      {/* Sidebar Buttons */}
      <div className="sidebar-buttons ">
        <Button className="new-post-button" href={`/Pazza/Class/${cid}/Create`}>
          <CiCirclePlus />
          New Post
        </Button>
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
            {/* Today Category */}
            <ListGroupItem className="post-category-today">
              <span
                className="post-today-cursor"
                onClick={() => setTogglePostsToday(!togglePostsToday)}
              >
                Today
                <GoTriangleDown />
              </span>{" "}
              {togglePostsToday && (
                <ListGroup>
                  <Link
                    href={`/Pazza/Class/${cid}/Posts/123`}
                    className="post-link"
                  >
                    <ListGroupItem className="post-item">
                      <div className="post-time float-end">Time</div>
                      <div className="posts-title">
                        <span className="border border-1 border-dark rounded ">
                          <FaChalkboardTeacher className="me-1" />
                          Instr
                        </span>{" "}
                        Post Title 1
                      </div>
                      <div className="posts-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum
                      </div>
                    </ListGroupItem>
                  </Link>
                </ListGroup>
              )}
            </ListGroupItem>

            {/* Yesterday Category */}
            <ListGroupItem className="post-category-yesterday">
              <span
                className="post-yesterday-cursor"
                onClick={() => setTogglePostsYesterday(!togglePostsYesterday)}
              >
                Yesterday
                <GoTriangleDown />{" "}
              </span>{" "}
              {togglePostsYesterday && (
                <ListGroup>
                  <Link
                    href={`/Pazza/Class/${cid}/Posts/124`}
                    className="post-link"
                  >
                    <ListGroupItem className="post-item">
                      <div className="post-time float-end">Time</div>
                      <div className="posts-title">
                        <span className="border border-1 border-dark rounded ">
                          <PiStudentBold className="me-1" />
                          Stu
                        </span>{" "}
                        Post Title 2
                      </div>
                      <div className="posts-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum
                      </div>
                    </ListGroupItem>
                  </Link>
                </ListGroup>
              )}
            </ListGroupItem>

            {/* Last Week Category */}
            <ListGroupItem className="post-category-yesterday">
              <span
                className="post-yesterday-cursor"
                onClick={() => setTogglePostsLastWeek(!togglePostsLastWeek)}
              >
                Last Week
                <GoTriangleDown />
              </span>{" "}
              {togglePostsLastWeek && (
                <ListGroup>
                  <Link
                    href={`/Pazza/Class/${cid}/Posts/125`}
                    className="post-link"
                  >
                    <ListGroupItem className="post-item">
                      <div className="post-time float-end">Time</div>
                      <div className="posts-title">
                        <span className="border border-1 border-dark rounded ">
                          <PiStudentBold className="me-1" />
                          Stu
                        </span>{" "}
                        Post Title 3
                      </div>
                      <div className="posts-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum
                      </div>
                    </ListGroupItem>
                  </Link>
                </ListGroup>
              )}
            </ListGroupItem>

            {/* Date Week Category */}
            <ListGroupItem className="post-category-yesterday">
              <span
                className="post-yesterday-cursor"
                onClick={() => setTogglePostsDateWeek(!togglePostsDateWeek)}
              >
                1/13 - 1/19
                <GoTriangleDown />
              </span>{" "}
              {togglePostsDateWeek && (
                <ListGroup>
                  <Link
                    href={`/Pazza/Class/${cid}/Posts/126`}
                    className="post-link"
                  >
                    <ListGroupItem className="post-item">
                      <div className="post-time float-end">Time</div>
                      <div className="posts-title">
                        <span className="border border-1 border-dark rounded ">
                          <PiStudentBold className="me-1" />
                          Stu
                        </span>{" "}
                        Post Title 4
                      </div>
                      <div className="posts-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum
                      </div>
                    </ListGroupItem>
                  </Link>
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
