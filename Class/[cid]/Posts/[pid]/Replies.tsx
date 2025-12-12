import React, { useState } from "react";
import { Button, Form, FormControl, Dropdown } from "react-bootstrap";
import { HiOutlineReply } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as client from "../../client";
import { useSelector } from "react-redux";
import { storeType } from "@/app/Pazza/store";
import { User } from "@/app/(Kambaz)/Account/reducer";

interface Reply {
    _id?: string;
    author?: User;
    details?: string;
    timestamp?: string;
    replies?: Reply[];
}

interface RepliesProps {
    replies: Reply[];
    pid: string;
    followupId: string;
    parentReplyId?: string;
    immediateParentId?: string;
    onUpdate: (updatedReplies: Reply[]) => void;
}

export default function Replies({
    replies,
    pid,
    followupId,
    parentReplyId,
    immediateParentId,
    onUpdate,
}: RepliesProps) {
    const [replyBoxMap, setReplyBoxMap] = useState<Record<string, boolean>>({});
    const [showEditReplyMap, setEditReplyMap] = useState<
        Record<string, boolean>
    >({});
    const [ReplyContent, setReplyContent] = useState("");
    const [editReplyContent, setEditReplyContent] = useState("");
    const currentUser = useSelector(
        (state: storeType) => state.accountReducer.currentUser
    );
    const { post } = useSelector((state: storeType) => state.classReducer);
    const isInstr = currentUser?.role === "FACULTY";
    const submitReplyToReply = async (replyId: string) => {
        const replyToReply = await client.createReplyToReply(
            pid,
            followupId,
            replyId,
            { details: ReplyContent }
        );
        setReplyContent("");

        const updateReplyInTree = (repliesList: Reply[]): Reply[] => {
            return repliesList.map((r) => {
                if (r._id === replyId) {
                    return {
                        ...r,
                        replies: [...(r.replies ?? []), replyToReply],
                    };
                } else if (r.replies && r.replies.length > 0) {
                    return {
                        ...r,
                        replies: updateReplyInTree(r.replies),
                    };
                }
                return r;
            });
        };

        const updatedReplies = updateReplyInTree(replies);
        onUpdate(updatedReplies);
    };

    const editReplyToFollowup = async (replyId: string, reply: string) => {
        // Check if we have an immediate parent (meaning this is a nested reply)
        if (immediateParentId) {
            // This is a nested reply (reply to reply)
            // API expects: /reply/:parentReplyId/:replyId
            await client.editReplyToReply(
                pid,
                followupId,
                immediateParentId,
                replyId,
                {
                    details: reply,
                }
            );
        } else {
            // Direct reply to followup
            await client.editReplyToFollowup(pid, followupId, replyId, {
                details: reply,
            });
        }

        // Recursively update the reply in the tree
        const updateReplyInTree = (repliesList: Reply[]): Reply[] => {
            return repliesList.map((r) => {
                if (r._id === replyId) {
                    return { ...r, details: reply };
                } else if (r.replies && r.replies.length > 0) {
                    return {
                        ...r,
                        replies: updateReplyInTree(r.replies),
                    };
                }
                return r;
            });
        };

        const newReplies = updateReplyInTree(replies);
        onUpdate(newReplies);
    };

    const deleteReply = async (replyId: string) => {
        if (immediateParentId) {
            await client.deleteReplyToReply(
                pid,
                followupId,
                immediateParentId,
                replyId
            );
        } else {
            await client.deleteReplyToFollowup(pid, followupId, replyId);
        }

        // Recursively remove the reply from the tree
        const removeReplyFromTree = (repliesList: Reply[]): Reply[] => {
            return repliesList
                .filter((r) => r._id !== replyId)
                .map((r) => {
                    if (r.replies && r.replies.length > 0) {
                        return {
                            ...r,
                            replies: removeReplyFromTree(r.replies),
                        };
                    }
                    return r;
                });
        };

        const newReplies = removeReplyFromTree(replies);
        onUpdate(newReplies);
    };

    return (
        <>
            {replies?.map((reply) => {
                const key = String(reply._id);
                const showReplyBox = replyBoxMap[key] ?? false;
                return (
                    <div key={reply._id} className="reply-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex">
                                <h6 className="me-2">
                                    <FaUser />
                                    {reply?.author?.firstName} {reply?.author?.lastName}
                                </h6>{" "}
                                <span className="timestamp">
                                    Updated {reply.timestamp?.slice(0, 10)}
                                </span>
                            </div>
                            {(isInstr ||
                                currentUser?._id === post?.author?._id) && (
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="link"
                                        className="p-0 text-dark"
                                        id={`dropdown-${key}`}
                                    >
                                        Actions
                                        <BsThreeDotsVertical />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setEditReplyContent(
                                                    reply.details
                                                        ? reply.details
                                                        : ""
                                                );
                                                setEditReplyMap((prev) => ({
                                                    ...prev,
                                                    [key]: !prev[key],
                                                }));
                                            }}
                                        >
                                            Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                deleteReply(reply._id || "")
                                            }
                                        >
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>

                        {!showEditReplyMap[key] && <>{reply.details}</>}

                        {showEditReplyMap[key] && (
                            <>
                                <Form>
                                    <FormControl
                                        type="text"
                                        value={editReplyContent}
                                        onChange={(e) => {
                                            setEditReplyContent(e.target.value);
                                        }}
                                        onKeyDown={async (e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                await editReplyToFollowup(
                                                    reply._id ? reply._id : "",
                                                    editReplyContent
                                                );
                                                setEditReplyMap((prev) => ({
                                                    ...prev,
                                                    [key]: !prev[key],
                                                }));
                                            }
                                        }}
                                    />
                                </Form>
                            </>
                        )}
                        <br />
                        <Button
                            onClick={() =>
                                setReplyBoxMap((prev) => ({
                                    ...prev,
                                    [key]: !showReplyBox,
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
                                    onChange={(e) => {
                                        setReplyContent(e.target.value);
                                    }}
                                />
                                <Button
                                    className="mt-2"
                                    onClick={() => {
                                        submitReplyToReply(
                                            reply._id ? reply._id : ""
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
                                    onClick={() => {
                                        setReplyBoxMap((prev) => ({
                                            ...prev,
                                            [key]: !showReplyBox,
                                        }));
                                    }}
                                    className="mt-2 ms-2"
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}

                        {/* Nested replies - recursive component */}
                        {reply.replies && reply.replies.length > 0 && (
                            <div className="ms-4">
                                <Replies
                                    replies={reply.replies}
                                    pid={pid}
                                    followupId={followupId}
                                    parentReplyId={reply._id}
                                    immediateParentId={reply._id}
                                    onUpdate={(updatedNestedReplies) => {
                                        const newReplies = replies.map((r) =>
                                            r._id === reply._id
                                                ? {
                                                      ...r,
                                                      replies:
                                                          updatedNestedReplies,
                                                  }
                                                : r
                                        );
                                        onUpdate(newReplies);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}
