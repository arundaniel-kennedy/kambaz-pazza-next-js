"use client";

import { redirect, useParams } from "next/navigation";
import { RootState } from "../../../(Kambaz)/store";
import React from "react";
import { useSelector } from "react-redux";

const AttentionRow = () => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Needs attention</h5>
                    <small className="card-text">5 unread posts</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Needs attention</h5>
                    <small className="card-text">5 unread posts</small>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Needs attention</h5>
                    <small className="card-text">5 unread posts</small>
                </div>
            </div>
        </div>
    );
};

const InfoRow = () => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Total Posts</h5>
                    <small className="card-text">20</small>
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
                    <small className="card-text">5</small>
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

const ParticipationRow = () => {
    return (
        <div className="d-flex flex-row gap-2 mb-3">
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Instructor Engagement</h5>
                    <small className="card-text">118</small>
                    <span className="text-secondary">instructor responses</span>
                </div>
            </div>
            <div className="card flex-grow-1">
                <div className="card-body">
                    <h5 className="card-title">Student Participation</h5>
                    <small className="card-text">19</small>
                    <span className="text-secondary">student responses</span>
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
    if (!currentUser) redirect(`/Account/Signin?redirect=/Pazza/Class/${cid}`);
    return (
        <div className="dashboard-wrapper">
            <h3>Class at a Glance</h3>
            <AttentionRow />
            <InfoRow />
            <ParticipationRow />
        </div>
    );
}
