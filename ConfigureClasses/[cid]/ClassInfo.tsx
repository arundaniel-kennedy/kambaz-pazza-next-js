"use client";

import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import ClassDetails from "./DataStructure";
import { storeType } from "../../store";

import { FaPlus } from "react-icons/fa6";

export default function ClassInfo() {
  const { class_info } = useSelector(
    (state: storeType) => state.classConfigureReducer
  );
  return (
    <div
      className="class-manage-content basic-info-wrapper"
      id="BasicInformation"
    >
      <div className="blue-info-box">
        <p>
          Edit your course <b>number & name</b>.
        </p>
        <p>
          Access your <b>course signup & direct links</b>
        </p>
        <p>
          Control whether instructors can <b>enroll themselves</b> in the course
        </p>
        <p>
          Need to pause the course for a take-home exam? Make the class{" "}
          <b>inactive</b>
        </p>
      </div>
      <div className="content">
        <h2>Class Information</h2>
        <div className="form-group">
          <label htmlFor="">Course Number:</label>
          <FormControl
            className="w-45"
            defaultValue={class_info?.course_number}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Course Name:</label>
          <FormControl
            className="w-45"
            defaultValue={class_info?.course_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Class Term:</label> &nbsp;{" "}
          <span>{class_info?.class_term}</span>
          <br />
          <small>
            To use Piazza for {class_info?.course_number} for a different term,
            click here to create a new class for that term.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Start date:</label>
          <FormControl className="w-45" defaultValue={class_info?.start_date} />
        </div>
        <div className="form-group">
          <label htmlFor="">Signup Link:</label>
          <FormControl className="" defaultValue={class_info?.singup_link} />

          <small>
            Direct students and fellow instructors to this URL, where they can
            sign up for this class.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Access Code:</label> <br />
          <button className="btn btn-outline-primary">
            <FaPlus /> Add access code
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="">Instructor Self-Signup:</label>
          <Form.Check type="switch" className="d-inline ms-2" />
          <br />
          <small>
            If Enabled: You will be notified each time someone signs up as an
            instructor to your class.
            <br />
            If Disabled: Instructors cannot sign up from the Piazza home page.
            You will need to enroll them below.
          </small>
        </div>
        <div className="form-group">
          <div className="d-flex align-items-center">
            <label htmlFor="">Class Status:</label>
            <Form.Check
              type="radio"
              name="class-status"
              id="classInfoClassStatusActive"
              className="ms-3 me-1"
            />
            <label htmlFor="classInfoClassStatusActive" className="mt-1">
              Active
            </label>
            <Form.Check
              type="radio"
              name="class-status"
              id="classInfoClassStatusInactive"
              className="ms-3 me-1"
            />
            <label htmlFor="classInfoClassStatusInactive" className="mt-1">
              Inactive
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Schedule Lock Dates/Times:</label> <br />
          <small>
            Schedule times when you want your class to be Inactive, say, while
            you are holding tests.
          </small>
          
          <br />

          <label htmlFor="">Your computer time:</label>
          <span>Sat Nov 29 2025 15:18:25 GMT-0500 (Eastern Standard Time)</span>
          
          <br />

          <label htmlFor="">Detected timezone:</label>
          <span>GMT-0500</span>

          <br />

          <button className="btn btn-outline-primary">
            <FaPlus /> Add another lock date/time
          </button>
        </div>
      </div>
    </div>
  );
}
