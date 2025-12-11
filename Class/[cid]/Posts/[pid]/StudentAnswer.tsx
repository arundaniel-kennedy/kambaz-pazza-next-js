"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { TbLetterS } from "react-icons/tb";
import { Posts } from "../../DataStructure";
import { FaUser } from "react-icons/fa6";
import CustomEditor from "./CustomEditor";
import { Button } from "react-bootstrap";

import * as client from "../../client";
import { setPost } from "../../reducer";
import { RootState } from "../../../../../(Kambaz)/store";

export default function StudentAnswer({ post }: { post: Posts }) {
    const { pid } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );
    const [answer, setAnswer] = useState("");
    const [editOn, setEditOn] = useState(false);
    const submitAnswer = async () => {
        if (post?.student_answer?._id) {
            const resp = await client.editAnswer(post?.student_answer?._id, {
                details: answer,
            });
            console.log(resp);
            dispatch(
                setPost({
                    ...post,
                    student_answer: resp,
                })
            );
        } else {
            const resp = await client.createStudentAnswerToPost(pid as string, {
                details: answer,
            });
            console.log(resp);
            dispatch(setPost({ ...post, student_answer: resp }));
        }
        setAnswer("");
        setEditOn(false);
    };
    const clearAnswer = () => {
        setAnswer("");
        setEditOn(false);
    };
    const editAnswer = () => {
        setEditOn(true);
        setAnswer(post?.student_answer?.details ?? "");
    };
    return (
        <div className="student-answer">
            <h5>
                <TbLetterS className="letter-s fs-2" />
                Student&apos;s Answer
            </h5>
            {post?.student_answer && !editOn && (
                <div key={post?.student_answer._id} className="ms-5">
                    <Button
                        className="bg-success float-end"
                        onClick={() => editAnswer()}
                        style={{ marginTop: "-43px" }}
                    >
                        Edit
                    </Button>
                    <div className="d-flex">
                        <h6 className="me-2">
                            <FaUser />
                            {post?.student_answer?.author?.firstName}{" "}
                            {post?.student_answer?.author?.lastName}
                        </h6>{" "}
                        <span className="timestamp">
                            Updated{" "}
                            {post?.student_answer?.timestamp?.slice(0, 10)}
                        </span>
                    </div>
                    <p className="text-break">{post?.student_answer.details}</p>
                </div>
            )}
            {(!post?.student_answer || editOn) &&
                currentUser?.role === "STUDENT" && (
                    <div>
                        <CustomEditor
                            content="custom"
                            value={answer}
                            onChangeF={setAnswer}
                        />
                        <Button
                            className="mt-2 bg-success"
                            onClick={() => submitAnswer()}
                        >
                            Submit
                        </Button>
                        <Button
                            className="ms-2 mt-2"
                            onClick={() => clearAnswer()}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
        </div>
    );
}
