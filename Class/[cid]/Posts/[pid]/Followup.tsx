"use client";

import React, { useState } from "react";
import { Button, Form, FormCheck, FormControl } from "react-bootstrap";
import { HiOutlineReply } from "react-icons/hi";
import { FollowUp, Posts } from "../../DataStructure";

import * as client from "../../client";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPost } from "../../reducer";
import { FaRegComment, FaUser } from "react-icons/fa6";

export default function Followup({ post }: { post: Posts }) {
  const { cid, pid } = useParams();
  const dispatch = useDispatch();

  const [isResolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap, setReplyBoxMap] = useState<Record<string, boolean>>({});
  const [replyBoxMap2, setReplyBoxMap2] = useState<Record<string, boolean>>({});
  const [followupContent, setFollowupContent] = useState("");

  const createFollowup = async () => {
    const newFollowup = await client.createFollowupToPost(pid as string, {
      details: followupContent,
    });
    setFollowupContent("");

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

  const updateFollowupResolved = (followup: FollowUp) => {
    // TODO: add code to update backend

    let followups = JSON.parse(JSON.stringify(post.follow_ups));
    let updatedFollowups = followups.map((f: any) => {
      if (f._id === followup._id) {
        f.is_resolved = !followup.is_resolved;
        return f;
      } else {
        return f;
      }
    });
    dispatch(
      setPost({
        ...post,
        follow_ups: updatedFollowups,
      })
    );
  };

  return (
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
                label={followup.is_resolved ? "Resolved" : "Unresolved"}
                onChange={() => updateFollowupResolved(followup)}
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
      <hr />
      <div className="followup-textbox mb-3">
        <Form>
          <FormControl
            type="text"
            placeholder="Compose a Followup Discussion here!"
            defaultValue={followupContent}
            onChange={(e) => {
              setFollowupContent(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createFollowup();
                setFollowupContent("")
              }
            }}
          />
        </Form>
      </div>
    </div>
  );
}
