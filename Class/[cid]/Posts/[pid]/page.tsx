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
import { storeType } from "@/src/app/Pazza/store";
import type { Posts } from "../../DataStructure";
import { setPosts } from "../../reducer";
import { FaRegComment, FaUser } from "react-icons/fa6";
import { TbLetterISmall, TbLetterS } from "react-icons/tb";
import CustomEditor from "./CustomEditor";
import { HiOutlineReply } from "react-icons/hi";

export default function Posts() {
  //All const declarations

  const [showEdit, setShowEdit] = useState(false);
  const { cid, pid } = useParams();
  const posts = useSelector((state: storeType) => state.classReducer.posts);
  const [post, setPost] = useState<Posts | undefined>({});
  const dispatch = useDispatch();
  const [html, setHtml] = useState("<b>HTML</b>");
  const [isResolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap, setReplyBoxMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap2, setReplyBoxMap2] = useState<Record<string, boolean>>({});
  const isQuestion = post?.post_type === "QUESTION" || "POLL";

  //Screen load
  useEffect(() => {
    const post = posts.find((p) => p._id === pid);
    setPost(post);
    getViewsOfPost();
  }, []);

  //All functions
  const editPost = () => setShowEdit(!showEdit);
  const getViewsOfPost = () => {
    //client call to get views of a post
    return null;
  };
  const submitAnswer = () => {};
  const toggleResolved = () => {};
  const views = getViewsOfPost();
  const onUpdatePost = () => {
    //call client update here
    dispatch(setPosts({ post }));
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
        {!showEdit && (
          <Button className="edit-button " onClick={() => editPost()}>
            Edit
          </Button>
        )}
        {showEdit && (
          <>
            <Button
              className="ms-3 edit-button "
              onClick={() => {
                onUpdatePost();
                editPost();
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
                <Button
                  className="ms-2 mt-2"
                  onClick={() =>
                    setPost((prev) =>
                      prev ? { ...prev, answer: undefined } : prev
                    )
                  }
                >
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
                <Button
                  className="ms-2 mt-2"
                  onClick={() =>
                    setPost((prev) =>
                      prev ? { ...prev, answer: undefined } : prev
                    )
                  }
                >
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
