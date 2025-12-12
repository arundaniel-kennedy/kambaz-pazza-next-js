"use client";

import { redirect, useParams } from "next/navigation";
import { RootState } from "../../../(Kambaz)/store";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../../store";

import * as kambazClient from "../../../(Kambaz)/Courses/client";

const AttentionRow = ({
    unreadPostCount,
    unansweredPostCount,
    unansweredFollowupsCount,
}: {
    unreadPostCount: Number;
    unansweredPostCount: Number;
    unansweredFollowupsCount: Number;
}) => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Unread Posts</h5>
                    <small className="card-text">
                        {unreadPostCount.toString()}
                    </small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Unanswered Questions</h5>
                    <small className="card-text">
                        {unansweredPostCount.toString()}
                    </small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Unanswered Followups</h5>
                    <small className="card-text">
                        {unansweredFollowupsCount.toString()}
                    </small>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({
    totalPostsCount,
    totalStudentsCount,
}: {
    totalPostsCount: Number;
    totalStudentsCount: Number;
}) => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Total Posts</h5>
                    <small className="card-text">
                        {totalPostsCount.toString()}
                    </small>
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
                    <small className="card-text">
                        {totalStudentsCount.toString()}
                    </small>
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

const ParticipationRow = ({
    instructorAnswerCount,
    studentAnswerCount,
}: {
    instructorAnswerCount: Number;
    studentAnswerCount: Number;
}) => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Instructor Engagement</h5>
                    <small className="card-text">
                        {instructorAnswerCount.toString()}
                    </small>
                    &nbsp;{" "}
                    <span className="text-secondary">instructor responses</span>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Student Participation</h5>
                    <small className="card-text">
                        {studentAnswerCount.toString()}
                    </small>
                    &nbsp;{" "}
                    <span className="text-secondary">student responses</span>
                </div>
            </div>
        </div>
    );
};

export default function DashBoard() {
    const { cid } = useParams();
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const { posts } = useSelector((state: storeType) => state.classReducer);

    const [totalStudentsCount, setTotalStudentsCount] = useState(0);

    if (!currentUser) redirect(`/Account/Signin?redirect=/Pazza/Class/${cid}`);

    const stats = useMemo(() => {
        const initialStats = {
            unread: 0,
            unanswered: 0,
            instructor: 0,
            student: 0,
            followups: 0,
        };

        if (!posts) return initialStats;

        return posts.reduce((acc, p) => {
            if (!p?.read_by?.includes(currentUser?._id)) {
                acc.unread += 1;
            }
            if (
                p.post_type === "QUESTION" &&
                !p.student_answer &&
                !p.instructor_answer
            ) {
                acc.unanswered += 1;
            }
            if (p.instructor_answer) {
                acc.instructor += 1;
            }
            if (p.student_answer) {
                acc.student += 1;
            }
            p?.follow_ups?.forEach((f) => {
                if (!f.is_resolved) {
                    acc.followups += 1;
                }
            });

            return acc;
        }, initialStats);
    }, [posts]);

    useEffect(() => {
        const getStudentsForCourse = async () => {
            let students = await kambazClient.findUsersForCourse(cid as string);
            setTotalStudentsCount(students.length);
        };
        getStudentsForCourse();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <h3>Class at a Glance</h3>
            <AttentionRow
                unreadPostCount={stats.unread}
                unansweredPostCount={stats.unanswered}
                unansweredFollowupsCount={stats.followups}
            />
            <InfoRow
                totalPostsCount={posts.length}
                totalStudentsCount={totalStudentsCount}
            />
            <ParticipationRow
                instructorAnswerCount={stats.instructor}
                studentAnswerCount={stats.student}
            />
        </div>
    );
}
