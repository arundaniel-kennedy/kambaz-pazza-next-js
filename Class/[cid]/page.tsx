"use client";

import { redirect, useParams } from "next/navigation";
import { RootState } from "../../../(Kambaz)/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../../store";
import { Posts } from "./DataStructure";

const AttentionRow = ({
    posts,
    userId,
}: {
    posts: Posts[];
    userId: string;
}) => {
    const unread_posts = posts.filter(
        (p) => !p?.read_by?.includes(userId)
    ).length;
    const unanswered_posts = posts.filter(
        (p) =>
            p.post_type === "QUESTION" &&
            (!p.hasOwnProperty("student_answer") ||
                p?.student_answer === null ||
                !p.hasOwnProperty("instructor_answer") ||
                p?.instructor_answer === null)
    ).length;
    let unanswered_followups = 0;
    posts.forEach((p) => {
        p?.follow_ups?.forEach((f) => {
            if (!f.is_resolved) unanswered_followups += 1;
        });
    });
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Unread Posts</h5>
                    <small className="card-text">{unread_posts}</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Unanswered Questions</h5>
                    <small className="card-text">{unanswered_posts}</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Unanswered Followups</h5>
                    <small className="card-text">{unanswered_followups}</small>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ posts }: { posts: Posts[] }) => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Total Posts</h5>
                    <small className="card-text">{posts.length}</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Total Contributions</h5>
                    <small className="card-text">12</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Students Enrolled</h5>
                    <small className="card-text">missing TODO</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">License Status</h5>
                    <small className="card-text">Active</small>
                </div>
            </div>
        </div>
    );
};

const ParticipationRow = ({ posts }: { posts: Posts[] }) => {
    let instructor_answer = 0;
    let student_answer = 0;
    posts.forEach((p) => {
        if (
            p.hasOwnProperty("instructor_answer") &&
            p?.instructor_answer !== null
        )
            instructor_answer += 1;
        if (p.hasOwnProperty("student_answer") && p?.student_answer !== null)
            student_answer += 1;
    });
    useEffect(() => {

    }, [posts])
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Instructor Engagement</h5>
                    <small className="card-text">{instructor_answer}</small>
                    &nbsp;{" "}
                    <span className="text-secondary">instructor responses</span>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Student Participation</h5>
                    <small className="card-text">{student_answer}</small>
                    &nbsp; <span className="text-secondary">student responses</span>
                </div>
            </div>
        </div>
    );
};

export default function page() {
    const { cid } = useParams();
    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    );
    const { posts } = useSelector((state: storeType) => state.classReducer);
    if (!currentUser) redirect(`/Account/Signin?redirect=/Pazza/Class/${cid}`);
    return (
        <div className="dashboard-wrapper">
            <h3>Class at a Glance</h3>
            <AttentionRow posts={posts} userId={currentUser._id ?? ""} />
            <InfoRow posts={posts} />
            <ParticipationRow posts={posts} />
        </div>
    );
}
