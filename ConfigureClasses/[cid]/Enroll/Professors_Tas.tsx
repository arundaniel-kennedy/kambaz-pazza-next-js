"use client";

import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { storeType } from "../../../store";

export default function Professors_Tas() {
  const { enrollment } = useSelector(
    (state: storeType) => state.classConfigureReducer
  );
  return (
    <div className="class-manage-content enroll-professor-wrapper">
      <div className="blue-info-box">
        <p>Make sure all instructors are enrolled in the course.</p>
        <p>
          The more folks you have responding to student questions, the better!
        </p>
      </div>
      <div className="content">
        <h2>Enroll Professors/TAs</h2>
        <div className="form-group">
          <label htmlFor="">
            Copy and paste email addresses in any format:
          </label>
          <small>
            Once added, they receive a Welcome email with a link to activate
            their Piazza account.
          </small>
          <FormControl as={"textarea"} rows={5} />
          <button className="btn btn-primary mt-3">Add Instructors</button>
        </div>
        <div className="form-group">
          <label htmlFor="">Instructor Roster:</label>
          <span className="d-block">12 Currently Enrolled</span>
        </div>
        <div className="form-group">
          <label htmlFor="">
            The following instructors are enrolled in your class.
          </label>
          <small className="d-block">
            Those who've activated their accounts will have names alongside
            their email address
          </small>
        </div>
        <div className="btn-group">
          <div className="btn btn-sm btn-outline-primary">
            Sort by First Name
          </div>
          <div className="btn btn-sm btn-outline-primary">Select all</div>
          <div className="btn btn-sm btn-outline-primary">Remove selected</div>
        </div>
        <ul className="mt-3 ps-0">
          {enrollment?.instructors?.map((instructor) => {
            return (
              <li
                key={"instructor_" + instructor.name}
                className="d-flex flex-row align-items-center gap-2"
              >
                <Form.Check />
                {instructor.name}{" "}({instructor.email},{" "}
                {instructor.alternate_email})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
