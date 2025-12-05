"use client";

import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../../../store";
import { updateClassInfo } from "../data/reducer";

import { FaPlus } from "react-icons/fa6";

export default function ClassInfo() {
  const { class_info } = useSelector(
    (state: storeType) => state.classConfigureReducer
  );
  const dispatch = useDispatch();
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
            onChange={(e) =>
              dispatch(
                updateClassInfo({
                  ...class_info,
                  course_number: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Course Name:</label>
          <FormControl
            className="w-45"
            defaultValue={class_info?.course_name}
            onChange={(e) =>
              dispatch(
                updateClassInfo({ ...class_info, course_name: e.target.value })
              )
            }
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
          <FormControl
            className="w-45"
            type="date"
            defaultValue={
              class_info?.start_date
                ? new Date(class_info.start_date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) =>
              dispatch(
                updateClassInfo({
                  ...class_info,
                  start_date: new Date(e.target.value).toISOString().split("T")[0],
                })
              )
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Signup Link:</label>
          <FormControl
            className=""
            defaultValue={class_info?.singup_link}
            disabled
          />

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
          <label htmlFor="">Class Link:</label>
          <FormControl
            className=""
            defaultValue={class_info?.class_link}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Instructor Self-Signup:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={class_info?.instructor_self_signup}
            onChange={(e) =>
              dispatch(
                updateClassInfo({
                  ...class_info,
                  instructor_self_signup: e.target.value,
                })
              )
            }
          />
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
              defaultChecked={class_info?.class_status}
              value={"active"}
              onChange={(e) =>
                dispatch(updateClassInfo({ ...class_info, class_status: true }))
              }
            />
            <label htmlFor="classInfoClassStatusActive" className="mt-1">
              Active
            </label>
            <Form.Check
              type="radio"
              name="class-status"
              id="classInfoClassStatusInactive"
              className="ms-3 me-1"
              value={"inactive"}
              defaultChecked={!class_info?.class_status}
              onChange={(e) =>
                dispatch(
                  updateClassInfo({ ...class_info, class_status: false })
                )
              }
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
            {class_info?.schedule_lock_time?.map((schedule) => {
              return <li>{schedule}</li>;
            })}
          </small>
          <br />
          <label htmlFor="" className="mt-3">
            Your computer time:
          </label>
          <span>Sat Nov 29 2025 15:18:25 GMT-0500 (Eastern Standard Time)</span>
          <br />
          <label htmlFor="" className="mt-2">
            Detected timezone:
          </label>
          <span>GMT-0500</span>
          <br />
          <button className="btn btn-outline-primary my-3">
            <FaPlus /> Add another lock date/time
          </button>
          <button className="btn btn-primary d-block mt-1">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
