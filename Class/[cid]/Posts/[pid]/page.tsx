"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormControl,
} from "react-bootstrap";
import "./posts.scss";

export default function Posts() {
  const [showEdit, setShowEdit] = useState(false);
  const editPost = () => setShowEdit(!showEdit);
  const { cid, pid } = useParams();
  return (
    <div className="post-screen-wrapper">
      <div className="actions-dropdown d-flex justify-content-end">
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
        <FormControl
          className="posts-title"
          defaultValue={`Post title ${pid}`}
        />
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
        <FormControl
          as="textarea"
          rows={8}
          className="posts-description  "
          defaultValue={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum `}
        />
      )}
      <hr />
      <br />
      <div className="folder-name">Folder Name</div>

      <Button className="edit-button" onClick={() => editPost()}>
        Edit
      </Button>
    </div>
  );
}
