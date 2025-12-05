"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import { storeType } from "../../../store";
import { updateFolderSettings } from "../data/reducer";
import { FaEyeSlash, FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";

import "./ClassFolders.scss";

export default function ClassFolders() {
  const { folders_settings } = useSelector(
    (state: storeType) => state.classConfigureReducer
  );
  const [suffix, setSuffix] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const dispatch = useDispatch();
  return (
    <div
      className="class-manage-content folder-setting-wrapper"
      id="FoldersSettings"
    >
      <div className="blue-info-box">
        <p>Folders are a way of keeping your class content organized.</p>
        <p>
          They can only be created by instructors and by default, are mandatory
          at the time of asking a new question.
        </p>
        <p>
          You, as an instructor, can create, edit or delete folders, as well as
          disable folders altogether.
        </p>
      </div>
      <div className="content">
        <h2>Configure Class Folders</h2>
        <div className="form-group">
          <label htmlFor="">Folders</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={folders_settings?.enable_folders}
            onChange={(e) =>
              dispatch(
                updateFolderSettings({
                  ...folders_settings,
                  enable_folders: !folders_settings?.enable_folders,
                })
              )
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Create new folders:</label>
          <span className="d-inline">
            Add folders that are relevant for your class. Select 'numbered' to
            create numbered folders (hw1-hw4).
          </span>
          <div className="d-flex flex-row align-items-center">
            <FormControl
              className="d-inline ms-2"
              placeholder="Add a folder(s)"
              onChange={(e) =>
                dispatch(
                  updateFolderSettings({
                    ...folders_settings,
                    enable_folders: !folders_settings?.enable_folders,
                  })
                )
              }
            />
            <Form.Check
              type="checkbox"
              className="mx-2"
              defaultChecked={suffix}
              onChange={(e) => setSuffix(!suffix)}
            />
            <label htmlFor="" className="text-nowrap me-2">
              numbered; suffix #s:
            </label>
            <FormControl
              className="d-inline"
              style={{ width: "50px", textAlign: "center" }}
              defaultValue={1}
              disabled={!suffix}
            />
            <label htmlFor="" className="mx-2">
              -
            </label>
            <FormControl
              className="d-inline w-10"
              defaultValue={4}
              style={{ width: "50px", textAlign: "center" }}
              disabled={!suffix}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Manage Folders</label>
          <span className="d-inline">
            Reorder, delete, edit folder names, or create subfolders. You can
            create up to 2 levels of nesting ("subfolders" and "subfolders to
            subfolders"). Manually sort folders and subfolders using the grip
            icon . Click folder icon to show and hide subfolders.
          </span>
          <div className="d-flex flex-row justify-content-between mt-4">
            <button
              className="btn btn-sm btn-outline-primary align-items-center d-flex gap-2"
              disabled={!(selectedFolders.length > 0)}
            >
              <FaTrash /> Delete selected folders
            </button>
            <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2">
              <FaEyeSlash /> Hide all subfolders
            </button>
          </div>
          <hr className="my-2" />
          <ul>
            {folders_settings?.folders?.map((folder) => {
              return (
                <li key={"folder_" + folder.name} className="d-flex flex-row align-items-center">
                  <Form.Check type="checkbox" onChange={e => {
                    if (e.target.checked) {
                      setSelectedFolders([...selectedFolders, folder.name])
                    } else {
                      setSelectedFolders(selectedFolders.filter(selectedFolder => selectedFolder != folder.name))
                    }
                  }}/>
                  <BsGripVertical className="mx-2" />
                  <span className="folder-pill">{folder.name}</span>
                  <div
                    className="btn-group ms-auto"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" className="btn btn-sm btn-outline-primary d-flex flex-row align-items-center gap-2">
                      <FaPencil /> Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-primary d-flex flex-row align-items-center gap-2">
                      <FaPlus /> Create Subfolders
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
}
