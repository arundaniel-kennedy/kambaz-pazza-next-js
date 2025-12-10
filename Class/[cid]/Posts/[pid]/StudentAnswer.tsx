import React from "react";
import { TbLetterS } from "react-icons/tb";
import { Posts } from "../../DataStructure";
import { FaUser } from "react-icons/fa6";
import CustomEditor from "./CustomEditor";
import { Button } from "react-bootstrap";

export default function StudentAnswer({ post }: { post: Posts }) {
  const submitAnswer = () => {};
  return (
    <div className="student-answer">
      <h5>
        <TbLetterS className="letter-s fs-2" />
        Student&apos;s Answer
      </h5>
      {post?.student_answer && (
        <div key={post?.student_answer._id} className="ms-5">
          <div className="d-flex">
            <h6 className="me-2">
              <FaUser />
              {post?.student_answer.author.firstName}{" "}
              {post?.student_answer.author.lastName}
            </h6>{" "}
            <span className="timestamp">
              Updated {post?.student_answer.timestamp.slice(0, 10)}
            </span>
          </div>
          {post?.student_answer.details} <br />
        </div>
      )}
      {!post?.student_answer && (
        <div>
          <CustomEditor />
          <Button className="mt-2 bg-success" onClick={() => submitAnswer()}>
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
