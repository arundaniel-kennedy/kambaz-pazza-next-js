import React from "react";
import Editor from "react-simple-wysiwyg";
import { setPosts } from "../../reducer";
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
          containerProps={{ style: { resize: "vertical" } }}
          value={`${post?.summary}`}
          
        />
      )}
      {content === "details" && (
        <Editor
          containerProps={{ style: { resize: "vertical" } }}
          value={`${post?.details}`}
          
        />
      )}
      {!content && (
        <Editor
          containerProps={{ style: { resize: "vertical" } }}
          onChange={(e) =>
            dispatch(setPosts({ ...post, answer: e.target.value }))
          }
        />
      )}
    </div>
  );
}
