import React from "react";
import { TbLetterISmall } from "react-icons/tb";
import { Posts } from "../../DataStructure";
import { FaUser } from "react-icons/fa6";
import CustomEditor from "./CustomEditor";
import { Button } from "react-bootstrap";

export default function InstructorAnswer({ post }: { post: Posts }) {
  const submitAnswer = () => {};
  return (
    <div className="instr-answer">
      <h5>
        <TbLetterISmall className="letter-i fs-2" />
        Instructor&apos;s Answer
      </h5>
      {post?.instructor_answer && (
        <div key={post?.instructor_answer._id} className="ms-5">
          <div className="d-flex">
            <h6 className="me-2">
              <FaUser /> {post?.instructor_answer.author.firstName}{" "}
              {post?.instructor_answer.author.lastName}
            </h6>{" "}
            <span className="timestamp">
              Updated {post?.instructor_answer.timestamp.slice(0, 10)}
            </span>
          </div>
          {post?.instructor_answer.details} <br />
        </div>
      )}
      {!post?.instructor_answer && (
        <div>
          <CustomEditor />
          <Button className="mt-2 bg-warning" onClick={() => submitAnswer()}>
            Submit
          </Button>
          <Button className="ms-2 mt-2" onClick={() => submitAnswer()}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
