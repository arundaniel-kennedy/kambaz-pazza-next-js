"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import "./posts.scss";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar,
  createButton,
} from "react-simple-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/Pazza/store";
import type { Posts } from "../../DataStructure";
import { setPosts } from "../../reducer";

export default function Posts() {
  //All const declarations
  const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
  const BtnAlignLeft = createButton("Align left", "⭠", "justifyLeft");
  const BtnAlignRight = createButton("Align right", "⭢", "justifyRight");
  const BtnImage = createButton("Insert image", "🖼️", "insertImage");
  const [showEdit, setShowEdit] = useState(false);
  const { cid, pid } = useParams();
  const posts = useSelector((state: RootState) => state.classReducer.posts);
  const [post, setPost] = useState<Posts | undefined>({});
  const dispatch = useDispatch();
  const views = 5;

  //Screen load
  useEffect(() => {
    const post = posts.find((p) => p.id === pid);
    setPost(post);
  }, []);

  //All functions
  const editPost = () => setShowEdit(!showEdit);
  const onUpdatePost = () => {
    //call client update here
    dispatch(setPosts({ post }));
  };
  const [html, setHtml] = useState("<b>HTML</b>");

  return (
    <div className="post-screen-wrapper">
      <div className="d-flex justify-content-between align-items-center question-views-wrapper">
        <div className="qv-container">Question @ {pid} </div>{" "}
        <div className="qv-container">Views : {views}</div>
      </div>

      <div className=" mt-2 d-flex justify-content-between">
        <h4 id="posts-author">Author</h4>
        <div>
          <Dropdown className="actions-dropdown">
            <DropdownToggle variant="light">Actions</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <hr />

      {!showEdit && <div className="posts-title">{post?.summary}</div>}
      {showEdit && (
        <div className="editor-wrapper mb-5">
          <EditorProvider>
            <Editor
              containerProps={{ style: { resize: "vertical" } }}
              defaultValue={post?.summary || "default"}
              onChange={(e) => {
                setHtml(e.target.value);
                dispatch(setPosts({ ...post, summary: e.target.value }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onUpdatePost();
                }
              }}
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
        </div>
      )}
      {!showEdit && <div className="posts-description">{post?.details}</div>}

      {showEdit && (
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
      <hr />
      <br />
      <div className="folder-name">Folder Name</div>

      {!showEdit && (
        <Button className="edit-button" onClick={() => editPost()}>
          Edit
        </Button>
      )}
      {showEdit && (
        <>
          <Button
            className="ms-3 edit-button "
            onClick={() => {
              onUpdatePost();
              editPost();
            }}
          >
            Submit
          </Button>
          <Button
            className="ms-3 text-dark cancel-button"
            onClick={() => editPost()}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}
