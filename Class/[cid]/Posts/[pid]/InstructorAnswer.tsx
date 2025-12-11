"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { TbLetterISmall, TbLetterS } from "react-icons/tb";
import { Posts } from "../../DataStructure";
import { FaUser } from "react-icons/fa6";
import CustomEditor from "./CustomEditor";
import { Button } from "react-bootstrap";

import * as client from "../../client";
import { setPost } from "../../reducer";
import { RootState } from "../../../../../(Kambaz)/store";

export default function InstructorAnswer({ post }: { post: Posts }) {
    const { pid } = useParams();
    const dispatch = useDispatch();

    const [answer, setAnswer] = useState("");
    const [editOn, setEditOn] = useState(false);
    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );
    const submitAnswer = async () => {
        if (post?.instructor_answer?._id) {
            const resp = await client.editAnswer(post?.instructor_answer?._id, {
                details: answer,
            });
            console.log(resp);
            dispatch(
                setPost({
                    ...post,
                    instructor_answer: resp,
                })
            );
        } else {
            const resp = await client.createInstructorAnswerToPost(
                pid as string,
                {
                    details: answer,
                }
            );
            console.log(resp);
            dispatch(setPost({ ...post, instructor_answer: resp }));
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
        setAnswer(post?.instructor_answer?.details ?? "");
    };
    return (
        <div className="instr-answer">
            <h5>
                <TbLetterISmall className="letter-i fs-2" />
                Instructor&apos;s Answer
            </h5>
            {post?.instructor_answer && !editOn && (
                <div key={post?.instructor_answer._id} className="ms-5">
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
                            {post?.instructor_answer?.author?.firstName}{" "}
                            {post?.instructor_answer?.author?.lastName}
                        </h6>{" "}
                        <span className="timestamp">
                            Updated{" "}
                            {post?.instructor_answer?.timestamp?.slice(0, 10)}
                        </span>
                    </div>
                    <p className="text-break">
                        {post?.instructor_answer?.details}
                    </p>
                </div>
            )}
            {(!post?.instructor_answer || editOn) &&
                ["FACULTY", "TA"].includes(currentUser?.role ?? "") && (
                    <div>
                        <CustomEditor
                            content="custom"
                            value={answer}
                            onChangeF={setAnswer}
                        />
                        <Button
                            className="mt-2 bg-warning"
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
