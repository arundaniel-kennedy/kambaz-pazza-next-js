"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormCheck,
} from "react-bootstrap";
import "./posts.scss";
import { useDispatch, useSelector } from "react-redux";

import type { Posts } from "../../DataStructure";
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
  const post = useSelector(
    (state: storeType) => state.classConfigureReducer as Posts | undefined
  );
  const dispatch = useDispatch();
  const [isResolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap, setReplyBoxMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap2, setReplyBoxMap2] = useState<Record<string, boolean>>({});
  const isQuestion = post
    ? post.post_type === "QUESTION" || post.post_type === "POLL"
    : false;
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const isInstr = currentUser?.role === "FACULTY";
  const authorId =
    typeof post?.author === "string"
      ? post.author
      : post?.author && typeof post.author === "object" && "_id" in post.author
      ? (post.author as { _id?: string })._id
      : undefined;
  //Screen load
  useEffect(() => {
    async function fetchPost() {
      const post = await client.getPost(cid as string);
      dispatch(setPost(post as Posts));
    }
    fetchPost();
  }, []);

  //All functions
  const editPost = () => setShowEdit(!showEdit);

  const submitAnswer = () => {};

  const editAnswer = () => {};

  const createFollowup = () => {};

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
          <div>
            <Dropdown className="actions-dropdown">
              <DropdownToggle variant="light">Actions</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div>
        <h6 id="posts-author">
          Updated by {post?.author} on{" "}
          <span className="timestamp"> {post?.timestamp?.slice(0, 10)}</span>
        </h6>
      </div>

      <hr />

      {!showEdit && <div className="posts-title">{post?.summary} </div>}
      {showEdit && (
        <div className="editor-wrapper mb-5">
          <CustomEditor post={post} content="summary" />
        </div>
      )}
      {!showEdit && <div className="posts-description">{post?.details}</div>}

      {showEdit && <CustomEditor post={post} content="details" />}
      <hr />
      <div className="d-flex">
        <div className="folder-name">Folder Name</div>
        {!showEdit &&(isInstr || authorId === currentUser?._id)&& (
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
            {post?.answer?.map((a) => {
              return a.author.includes("student") ? (
                <div key={a._id} className="ms-5">
                  <div className="d-flex">
                    <h6 className="me-2">
                      <FaUser />
                      {a.author}
                    </h6>{" "}
                    <span className="timestamp">
                      Updated {a.timestamp.slice(0, 10)}
                    </span>
                  </div>
                  {a.details} <br />
                </div>
              ) : null;
            })}
            {!post?.answer && (
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
            {post?.answer?.map((a) => {
              return a.author.includes("instructor") ? (
                <div key={a._id} className="ms-5">
                  <div className="d-flex">
                    <h6 className="me-2">
                      <FaUser /> {a.author}
                    </h6>{" "}
                    <span className="timestamp">
                      Updated {a.timestamp.slice(0, 10)}
                    </span>
                  </div>
                  {a.details} <br />
                </div>
              ) : null;
            })}
            {!post?.answer && (
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
        {post?.answer && <Form />}
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
      </div>
    </div>
  );
}
