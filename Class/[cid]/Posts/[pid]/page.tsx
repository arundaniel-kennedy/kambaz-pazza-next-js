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
export default function Posts() {
  //All const declarations

  const [showEdit, setShowEdit] = useState(false);
  const { cid, pid } = useParams();
  const { post } = useSelector((state: storeType) => state.classReducer);
  const dispatch = useDispatch();
  const [isResolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap, setReplyBoxMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap2, setReplyBoxMap2] = useState<Record<string, boolean>>({});
  const [followup, setFollowup] = useState<FollowUp>({ details: "" });

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

  const submitAnswer = () => {};

  const editAnswer = () => {};

  const createFollowup = async () => {
    const newFollowup = await client.createFollowupToPost(
      pid as string,
      followup
    );
    setFollowup({ details: "" }); 
    
    dispatch(
      setPost({
        ...post,
        follow_ups: [...(post?.follow_ups ?? []), newFollowup],
      })
    );
    console.log("folloup", newFollowup);
  };

  const createReplyToFollowup = () => {};

  const createReplyToReply = () => {};

  const toggleResolved = () => {};

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
          {" "}
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
          <div className="student-answer">
            <h5>
              <TbLetterS className="letter-s fs-2" />
              Student&apos;s Answer
            </h5>
            {post?.student_answer && (
              <div key={post?.student_answer._id} className="ms-5">
                <div className="d-flex">
                  <h6 className="me-2">
                    <FaUser />
                    {post?.student_answer.author.firstName}{" "}
                    {post?.student_answer.author.lastName}
                  </h6>{" "}
                  <span className="timestamp">
                    Updated {post?.student_answer.timestamp.slice(0, 10)}
                  </span>
                </div>
                {post?.student_answer.details} <br />
              </div>
            )}
            {!post?.student_answer && (
              <div>
                <CustomEditor />
                <Button
                  className="mt-2 bg-success"
                  onClick={() => submitAnswer()}
                >
                  Submit
                </Button>
                <Button className="ms-2 mt-2" onClick={() => submitAnswer()}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <div className="instr-answer">
            <h5>
              <TbLetterISmall className="letter-i fs-2" />
              Instructor&apos;s Answer
            </h5>
            {post?.instructor_answer && (
              <div key={post?.instructor_answer._id} className="ms-5">
                <div className="d-flex">
                  <h6 className="me-2">
                    <FaUser /> {post?.instructor_answer.author.firstName}{" "}
                    {post?.instructor_answer.author.lastName}
                  </h6>{" "}
                  <span className="timestamp">
                    Updated {post?.instructor_answer.timestamp.slice(0, 10)}
                  </span>
                </div>
                {post?.instructor_answer.details} <br />
              </div>
            )}
            {!post?.instructor_answer && (
              <div>
                <CustomEditor />
                <Button
                  className="mt-2 bg-warning"
                  onClick={() => submitAnswer()}
                >
                  Submit
                </Button>
                <Button className="ms-2 mt-2" onClick={() => submitAnswer()}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      <hr />
      <div className="followup">
        {(post?.instructor_answer || post?.student_answer) && <Form />}
        <h5>
          <FaRegComment /> Follow Up Discussions
        </h5>
        <hr />
        <div className="followup-lists">
          {post?.follow_ups?.map((followup) => {
            const key = String(followup._id);
            const isResolved = isResolvedMap[key] ?? followup.is_resolved;
            const showReplyBox = replyBoxMap[key] ?? false;
            return (
              <div key={key} className="followup-item">
                <FormCheck
                  defaultChecked={followup.is_resolved}
                  type="switch"
                  label={isResolved ? "Resolved" : "Unresolved"}
                  onChange={() =>
                    setResolvedMap((prev) => ({
                      ...prev,
                      [key]: !isResolved,
                    }))
                  }
                ></FormCheck>
                <div className="d-flex">
                  <h4>
                    <FaUser />
                    {followup.author}
                  </h4>
                  <h6 className="ms-2">
                    <span className="timestamp">
                      Updated {followup.timestamp?.slice(0, 10)}
                    </span>
                  </h6>{" "}
                </div>
                <h5>
                  {followup.details} <br />{" "}
                  <Button
                    className="reply-button"
                    onClick={() =>
                      setReplyBoxMap((prev) => ({
                        ...prev,
                        [key]: !showReplyBox,
                      }))
                    }
                  >
                    <HiOutlineReply />
                    Reply
                  </Button>
                  {showReplyBox && (
                    <div className="mt-2">
                      <textarea
                        className="form-control"
                        placeholder="Write your reply..."
                        rows={3}
                      />
                      <Button className="mt-2">Submit Reply</Button>
                      <Button
                        onClick={() =>
                          setReplyBoxMap((prev) => ({
                            ...prev,
                            [key]: !showReplyBox,
                          }))
                        }
                        className="mt-2 ms-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </h5>
                {followup?.replies?.map((reply) => {
                  const key = String(reply._id);
                  const showReplyBox = replyBoxMap2[key] ?? false;
                  return (
                    <div key={reply._id} className="reply-item">
                      <div className="d-flex">
                        <h6 className="me-2">
                          <FaUser />
                          {reply.author}
                        </h6>{" "}
                        <span className="timestamp">
                          Updated {reply.timestamp?.slice(0, 10)}
                        </span>
                      </div>
                      {reply.details}
                      <br />{" "}
                      <Button
                        onClick={() =>
                          setReplyBoxMap2((prev) => ({
                            ...prev,
                            [key]: !showReplyBox, // toggle only this reply box
                          }))
                        }
                        className="reply-button"
                      >
                        <HiOutlineReply />
                        Reply
                      </Button>
                      {showReplyBox && (
                        <div className="mt-2">
                          <textarea
                            className="form-control"
                            placeholder="Write your reply..."
                            rows={3}
                          />
                          <Button className="mt-2">Submit Reply</Button>
                          <Button
                            onClick={() =>
                              setReplyBoxMap2((prev) => ({
                                ...prev,
                                [key]: !showReplyBox,
                              }))
                            }
                            className="mt-2 ms-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="followup-textbox">
          <Form>
            <FormControl
              type="text"
              placeholder="Compose a Followup Discussion here!"
              onChange={(e) => {
                setFollowup({ ...followup, details: e.target.value });
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await createFollowup();
                  
                }
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
