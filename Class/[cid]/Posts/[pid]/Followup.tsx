"use client";

import React, { useState } from "react";
import {
    Button,
    Form,
    FormCheck,
    FormControl,
    Dropdown,
} from "react-bootstrap";
import { HiOutlineReply } from "react-icons/hi";
import { FollowUp, Posts } from "../../DataStructure";
import { BsThreeDotsVertical } from "react-icons/bs";

import * as client from "../../client";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../reducer";
import { FaRegComment, FaUser } from "react-icons/fa6";
import { storeType } from "@/app/Pazza/store";
import Replies from "./Replies";

export default function Followup({ post }: { post: Posts }) {
    const { cid, pid } = useParams();
    const dispatch = useDispatch();

    const [isResolvedMap, setResolvedMap] = useState<Record<string, boolean>>(
        {}
    );
    const [replyBoxMap, setReplyBoxMap] = useState<Record<string, boolean>>({});
    const [followupContent, setFollowupContent] = useState("");
    const [editFollowupContent, setEditFollowupContent] = useState("");
    const [ReplyContent, setReplyContent] = useState("");
    const [showEdit, setShowEdit] = useState<Record<string, boolean>>({});
    const currentUser = useSelector(
        (state: storeType) => state.accountReducer.currentUser
    );
    const isInstr = currentUser?.role === "FACULTY";

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

    const submitReplyToFollowup = async (followupId: string) => {
        const replyToFollowUp = await client.createReplyToFollowup(
            pid as string,
            followupId,
            { details: ReplyContent }
        );
        setReplyContent("");
        const updatedFollowups = post?.follow_ups?.map((f) =>
            f._id === followupId
                ? {
                      ...f,
                      replies: [...(f.replies ?? []), replyToFollowUp],
                  }
                : f
        );
        dispatch(
            setPost({
                ...post,
                follow_ups: updatedFollowups,
            })
        );
    };

    const toggleResolved = () => {};

    const updateFollowupResolved = async (followup: FollowUp) => {
        await client.editFollowup(pid as string, followup._id ?? "", {
            ...followup,
            is_resolved: !followup.is_resolved,
        });

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

    const editFollowup = async (followupId: string, followup: string) => {
        const updatedFollowup = await client.editFollowup(
            pid as string,
            followupId,
            { details: followup }
        );
        let newFollowups = post.follow_ups?.map((f: any) => {
            if (f._id === updatedFollowup._id) {
                return { ...f, ...updatedFollowup };
            } else {
                return f;
            }
        });
        dispatch(
            setPost({
                ...post,
                follow_ups: newFollowups,
            })
        );
    };

    const deleteFollowup = async (followupId: string) => {
        await client.deleteFollowup(pid as string, followupId);

        const newFollowups = post.follow_ups?.filter(
            (f) => f._id !== followupId
        );
        dispatch(
            setPost({
                ...post,
                follow_ups: newFollowups,
            })
        );
    };

    const handleRepliesUpdate = (followupId: string, updatedReplies: any[]) => {
        const newFollowups = post.follow_ups?.map((f: any) => {
            if (f._id === followupId) {
                return {
                    ...f,
                    replies: updatedReplies,
                };
            }
            return f;
        });

        dispatch(
            setPost({
                ...post,
                follow_ups: newFollowups,
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
                    const isResolved =
                        isResolvedMap[key] ?? followup.is_resolved;
                    const showReplyBox = replyBoxMap[key] ?? false;
                    return (
                        // These are followups
                        <div key={key} className="followup-item">
                            <div className="d-flex justify-content-between align-items-start">
                                <FormCheck
                                    defaultChecked={followup.is_resolved}
                                    type="switch"
                                    label={
                                        followup.is_resolved
                                            ? "Resolved"
                                            : "Unresolved"
                                    }
                                    onChange={() =>
                                        updateFollowupResolved(followup)
                                    }
                                ></FormCheck>
                                {(isInstr ||
                                    currentUser?._id === post?.author?._id) && (
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="p-0 text-dark"
                                            id={`dropdown-followup-${key}`}
                                        >
                                            Actions
                                            <BsThreeDotsVertical />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    setEditFollowupContent(
                                                        followup.details
                                                            ? followup.details
                                                            : ""
                                                    );
                                                    setShowEdit((prev) => ({
                                                        ...prev,
                                                        [key]: !prev[key],
                                                    }));
                                                }}
                                            >
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    deleteFollowup(
                                                        followup._id || ""
                                                    )
                                                }
                                            >
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </div>

                            <div className="d-flex align-items-center mt-1">
                                <h4>
                                    <FaUser style={{ marginTop: "-8px" }} className="me-2"/>
                                    {followup?.author?.firstName}{" "}
                                    {followup?.author?.lastName}
                                </h4>
                                <h6 className="ms-2">
                                    <span className="timestamp">
                                        Updated{" "}
                                        {followup.timestamp?.slice(0, 10)}
                                    </span>
                                </h6>{" "}
                            </div>

                            {showEdit[key] && (
                                <div className="followup-textbox mb-3">
                                    <Form>
                                        <FormControl
                                            type="text"
                                            value={editFollowupContent}
                                            onChange={(e) => {
                                                setEditFollowupContent(
                                                    e.target.value
                                                );
                                            }}
                                            onKeyDown={async (e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    await editFollowup(
                                                        followup._id
                                                            ? followup._id
                                                            : "",
                                                        editFollowupContent
                                                    );
                                                    setShowEdit((prev) => ({
                                                        ...prev,
                                                        [key]: !prev[key],
                                                    }));
                                                }
                                            }}
                                        />
                                    </Form>
                                </div>
                            )}
                            <h5>
                                {!showEdit[key] && (
                                    <>
                                        {followup.details} <br />{" "}
                                    </>
                                )}
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
                                            onChange={(e) => {
                                                setReplyContent(e.target.value);
                                            }}
                                        />
                                        <Button
                                            className="mt-2"
                                            onClick={() => {
                                                submitReplyToFollowup(
                                                    followup._id
                                                        ? followup._id
                                                        : ""
                                                );
                                                setReplyBoxMap((prev) => ({
                                                    ...prev,
                                                    [key]: !showReplyBox,
                                                }));
                                            }}
                                        >
                                            Submit Reply
                                        </Button>
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

                            {/* These are replies to followups */}
                            {followup?.replies &&
                                followup.replies.length > 0 && (
                                    <Replies
                                        replies={followup.replies}
                                        pid={pid as string}
                                        followupId={followup._id || ""}
                                        immediateParentId={undefined}
                                        onUpdate={(updatedReplies) =>
                                            handleRepliesUpdate(
                                                followup._id || "",
                                                updatedReplies
                                            )
                                        }
                                    />
                                )}
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
                        value={followupContent}
                        onChange={(e) => {
                            setFollowupContent(e.target.value);
                        }}
                        onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                createFollowup();
                                setFollowupContent("");
                            }
                        }}
                    />
                </Form>
            </div>
        </div>
    );
}
