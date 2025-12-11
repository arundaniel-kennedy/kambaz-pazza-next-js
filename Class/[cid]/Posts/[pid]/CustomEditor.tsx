import React, { SetStateAction } from "react";
import Editor from "react-simple-wysiwyg";
import { setPost } from "../../reducer";
import { Posts } from "../../DataStructure";
import { useDispatch } from "react-redux";

export default function CustomEditor({
  post,
  content,
  value,
  onChangeF
}: {
  post?: Posts;
  content?: string;
  value?: string;
  onChangeF?: (value: string) => void;
}) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded">
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
      {content === "custom" && (
        <Editor
          value={`${value}`}
          onChange={(e) => onChangeF && onChangeF(e.target.value)}
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
