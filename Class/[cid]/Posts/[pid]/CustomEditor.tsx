import React from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnUndo,
  BtnRedo,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  createButton,
} from "react-simple-wysiwyg";
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
  const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
  const BtnAlignLeft = createButton("Align left", "⭠", "justifyLeft");
  const BtnAlignRight = createButton("Align right", "⭢", "justifyRight");
  const BtnImage = createButton("Insert image", "🖼️", "insertImage");
  return (
    <div>
      {" "}
      {content === "summary" && (
        <EditorProvider>
          <Editor
            containerProps={{ style: { resize: "vertical" } }}
            value={`${post?.summary}`}
            onChange={(e) =>
              dispatch(setPosts({ ...post, summary: e.target.value }))
            }
          >
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnNumberedList />
              <BtnBulletList />
              <BtnAlignLeft />
              <BtnAlignCenter />
              <BtnAlignRight />
              <BtnLink />
              <BtnImage />
              <BtnClearFormatting />
            </Toolbar>
          </Editor>
        </EditorProvider>
      )}
      {content === "details" && (
        <EditorProvider>
          <Editor
            containerProps={{ style: { resize: "vertical" } }}
            value={`${post?.details}`}
            onChange={(e) =>
              dispatch(setPosts({ ...post, details: e.target.value }))
            }
          >
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnNumberedList />
              <BtnBulletList />
              <BtnAlignLeft />
              <BtnAlignCenter />
              <BtnAlignRight />
              <BtnLink />
              <BtnImage />
              <BtnClearFormatting />
            </Toolbar>
          </Editor>
        </EditorProvider>
      )}
      {(!content) && (<EditorProvider>
          <Editor
            containerProps={{ style: { resize: "vertical" } }}
            onChange={(e) =>
              dispatch(setPosts({ ...post, answer: e.target.value }))
            }
          >
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnNumberedList />
              <BtnBulletList />
              <BtnAlignLeft />
              <BtnAlignCenter />
              <BtnAlignRight />
              <BtnLink />
              <BtnImage />
              <BtnClearFormatting />
            </Toolbar>
          </Editor>
        </EditorProvider>)}
    </div>
  );
}
