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
import { useParams, usePathname } from "next/navigation";
import { GoTriangleDown } from "react-icons/go";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { storeType } from "../../store";
import { useSelector } from "react-redux";


export default function Sidebar() {
  const [togglePostsToday, setTogglePostsToday] = useState(true);
  const [togglePostsYesterday, setTogglePostsYesterday] = useState(true);
  const [togglePostsLastWeek, setTogglePostsLastWeek] = useState(true);
  const [togglePostsDateWeek, setTogglePostsDateWeek] = useState(true);
  const { cid, pid } = useParams();
  const pathname = usePathname();
  const posts = useSelector((state: storeType) => state.classReducer.posts);
  
  const getYesterdayPosts = () => {
    //client call to get yesterday posts
  };
  const getTodayPosts = () => {
    //client call to dget today posts
  };
  const getWeekWisePosts = () => {
    //client calll to get week wise posts
  };
  const yesterdayPosts = getYesterdayPosts();
  const todayPosts = getTodayPosts();
  const weekWisePosts = getWeekWisePosts();
  return (
    <div className="sidebar-wrapper">
      {/* Sidebar Buttons */}
      <div className="sidebar-buttons ">
        <Link href={`/Pazza/Class/${cid}/Create`} className="text-decoration-none">
          <Button className="new-post-button w-100">
            <CiCirclePlus />
            <span className="ms-2 text-white">New Post</span>
          </Button>
        </Link>
        <div className="search-icon fs-4">
          <CiSearch />
        </div>
        <FormControl className="search-bar" placeholder="Search posts..." />
      </div>
      <div className="posts-feed">
        {/* All Posts */}
        <div className="posts-list ">
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
                  {posts.map((post) => {
                    return (
                      <div key={post._id}>
                        <Link
                          href={`/Pazza/Class/${cid}/Posts/${post._id}`}
                          className="post-link"
                        >
                          <ListGroupItem
                            className={`post-item  ${
                              pathname.includes(`${post._id}`)
                                ? " bg-primary-subtle"
                                : ""
                            }`}
                          >
                            <div className="post-time float-end">
                              {post.timestamp.slice(0, 10)}
                            </div>
                            <div className="posts-title">
                              {post.author.includes("instructor") && (
                                <>
                                  <span className="border border-1 border-dark rounded">
                                    <FaChalkboardTeacher className="me-1" />
                                    Instr
                                  </span>{" "}
                                </>
                              )}
                              {post.author.includes("student") && (
                                <>
                                  <span className="border border-1 border-dark rounded ">
                                    <PiStudentBold className="me-1" />
                                    Stu
                                  </span>{" "}
                                </>
                              )}

                              {post.summary}
                            </div>
                            <div className="posts-description">
                              {post.details}
                            </div>
                          </ListGroupItem>
                        </Link>
                      </div>
                    );
                  })}
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
                    <ListGroupItem
                      className={`post-item  ${
                        pathname.includes("124") ? " bg-primary-subtle" : ""
                      }`}
                    >
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
                    <ListGroupItem
                      className={`post-item  ${
                        pathname.includes("125") ? " bg-primary-subtle" : ""
                      }`}
                    >
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
                    <ListGroupItem
                      className={`post-item  ${
                        pathname.includes("126") ? " bg-primary-subtle" : ""
                      }`}
                    >
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
