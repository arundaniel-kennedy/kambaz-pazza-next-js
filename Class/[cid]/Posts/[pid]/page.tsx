"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
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

export default function Posts() {
  const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
  const BtnAlignLeft = createButton("Align left", "⭠", "justifyLeft");
  const BtnAlignRight = createButton("Align right", "⭢", "justifyRight");
  const BtnImage = createButton("Insert image", "🖼️", "insertImage");
  const [showEdit, setShowEdit] = useState(false);
  const editPost = () => setShowEdit(!showEdit);
  const { cid, pid } = useParams();
  const views = 5;
  return (
    <div className="post-screen-wrapper">
      <div className="d-flex justify-content-between align-items-center question-views-wrapper">
        <div className="qv-container">Question @ {pid} </div> <div className="qv-container">Views : {views}</div>
      </div>
      <div className="actions-dropdown mt-2 d-flex justify-content-end">
        <Dropdown>
          <DropdownToggle variant="light">Actions</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <hr />

      {!showEdit && <div className="posts-title ">Post title {pid}</div>}
      {showEdit && (
        <div className="editor-wrapper mb-5">
          <EditorProvider>
            <Editor
              containerProps={{ style: { resize: "vertical" } }}
              value={`Post title ${pid}`}
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
      {!showEdit && (
        <div className="posts-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </div>
      )}

      {showEdit && (
        <EditorProvider>
          <Editor
            containerProps={{ style: { resize: "vertical" } }}
            value={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum`}
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

      <Button className="edit-button" onClick={() => editPost()}>
        Edit
      </Button>
      {showEdit && (
        <>
          <Button className="ms-3 edit-button ">Submit</Button>
          <Button className="ms-3 text-dark cancel-button" onClick={() => editPost()}>Cancel</Button>
        </>
      )}
    </div>
  );
}
