import React from "react";
import Editor from "react-simple-wysiwyg";
import { setPost } from "../../reducer";
import { Posts } from "../../DataStructure";
import { useDispatch } from "react-redux";

export default function CustomEditor({
  post,
  content,
}: {
  post?: Posts;
  content?: string;
}) {
  const dispatch = useDispatch();

  return (
    <div>
      {" "}
      {content === "summary" && (
        <Editor
          value={`${post?.summary}`}
          onChange={(e) => {
            dispatch(setPost({ ...post, summary: e.target.value }));
          }}
        />
      )}
      {content === "details" && (
        <Editor
          value={`${post?.details}`}
          onChange={(e) => {
            dispatch(setPost({ ...post, details: e.target.value }));
          }}
        />
      )}
      {!content && (
        <Editor
          onChange={(e: any) =>
            dispatch(setPost({ ...post, answer: e.target.value }))
          }
        />
      )}
    </div>
  );
}
