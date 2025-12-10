"use client";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormCheck,
  FormControl,
} from "react-bootstrap";
import "./posts.scss";
import { useDispatch, useSelector } from "react-redux";

import type { FollowUp, Posts } from "../../DataStructure";
import { setPost } from "../../reducer";
import { FaRegComment, FaUser } from "react-icons/fa6";
import { TbLetterISmall, TbLetterS } from "react-icons/tb";
import CustomEditor from "./CustomEditor";
import { HiOutlineReply } from "react-icons/hi";
import * as client from "../../client";
import { storeType } from "@/app/Pazza/store";
import { RootState } from "@/app/(Kambaz)/store";
import StudentAnswer from "./StudentAnswer";
import InstructorAnswer from "./InstructorAnswer";
import Followup from "./Followup";

export default function Posts() {
  //All const declarations

  const [showEdit, setShowEdit] = useState(false);
  const { cid, pid } = useParams();
  const { post } = useSelector((state: storeType) => state.classReducer);
  const dispatch = useDispatch();

  const isQuestion = post
    ? post.post_type === "QUESTION" || post.post_type === "POLL"
    : false;
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const isInstr = currentUser?.role === "FACULTY";
  if (!currentUser)
    redirect(`/Account/Signin?redirect=/Pazza/Class/${cid}/Posts/${pid}`);

  async function fetchPost() {
    const post = await client.getPost(pid as string);
    dispatch(setPost(post));
  }

  //Screen load
  useEffect(() => {
    fetchPost();
  }, []);

  //All functions
  const editPost = () => setShowEdit(!showEdit);

  const views = post?.read_by?.length;

  const onUpdatePost = async (postUpdates: Posts) => {
    const updatedPost = await client.editPost(post?._id, postUpdates);
    dispatch(setPost(updatedPost as Posts));
  };
  return (
    <div className="post-screen-wrapper">
      <div className="d-flex justify-content-between align-items-center question-views-wrapper">
        <div className="qv-container">
          {post?.post_type} @ {pid}{" "}
        </div>{" "}
        <div className="d-flex">
          <div className="qv-container">Views : {views}</div>
          {(isInstr || currentUser?._id === post?.author?._id) && (
            <div>
              <Dropdown className="actions-dropdown">
                <DropdownToggle variant="light">Actions</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      <div>
        <h6 id="posts-author">
          Updated by {post?.author?.firstName} {post?.author?.lastName} on{" "}
          <span className="timestamp"> {post?.timestamp?.slice(0, 10)}</span>
        </h6>
      </div>

      <hr />

      {!showEdit && <div className="posts-title">{post?.summary} </div>}
      {showEdit && (
        <div className="editor-wrapper mb-5">
          <h4>Title</h4>
          <CustomEditor post={post} content="summary" />
        </div>
      )}
      {!showEdit && <div className="posts-description">{post?.details}</div>}

      {showEdit && (
        <>
          <h4>Details</h4>
          <CustomEditor post={post} content="details" />
        </>
      )}
      <hr />
      <div className="d-flex">
        <div className="folder-name">Folder Name</div>
        {!showEdit && (isInstr || currentUser?._id === post?.author?._id) && (
          <Button className="edit-button " onClick={() => editPost()}>
            Edit
          </Button>
        )}
        {showEdit && (
          <>
            <Button
              className="ms-3 edit-button "
              onClick={() => {
                if (post) {
                  onUpdatePost(post);
                  editPost();
                }
              }}
            >
              Submit
            </Button>
            <Button
              className="ms-3 text-dark cancel-button"
              onClick={() => editPost()}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
      <hr />
      {isQuestion && (
        <>
          <StudentAnswer post={post ?? {}} />
          <InstructorAnswer post={post ?? {}} />
        </>
      )}
      <hr />
      <Followup post={post ?? {}} />
    </div>
  );
}