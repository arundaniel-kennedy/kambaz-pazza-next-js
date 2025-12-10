"use client";

import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import { storeType } from "../../../store";
import { updateFolderSettings } from "../data/reducer";
import {
  FaCheck,
  FaEyeSlash,
  FaPencil,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";

import * as client from "../data/client";

import "./ClassFolders.scss";
import { useParams } from "next/navigation";

export default function ClassFolders() {
  const { cid } = useParams();
  const { folders_settings } = useSelector(
    (state: storeType) => state.classConfigureReducer
  );
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState(false);
  const [suffixStart, setSuffixStart] = useState(1);
  const [suffixEnd, setSuffixEnd] = useState(4);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [editFolder, setEditFolder] = useState("");
  const [editFolderName, setEditFolderName] = useState("");
  const dispatch = useDispatch();

  const fetchFolders = async () => {
    const folders = await client.fetchFoldersForCourse(cid as string);
    dispatch(updateFolderSettings({ ...folders_settings, folders: folders }));
  };
  const createNewFolder = async () => {
    const folders = [];
    if (suffix) {
      for (let i = suffixStart; i <= suffixEnd; i++) {
        folders.push(prefix + "" + i);
      }
    } else {
      folders.push(prefix);
    }
    const addedFolders = await client.createNewFolder(cid as string, folders);
    if (addedFolders.hasOwnProperty("message")) {
      if (addedFolders.message.message.includes("duplicate key error"))
        alert(`Entered folder name(s) already present under course ${cid}`);
    } else {
      const updatedFolders = JSON.parse(
        JSON.stringify(folders_settings?.folders)
      );
      dispatch(
        updateFolderSettings({
          ...folders_settings,
          folders: [...updatedFolders, ...addedFolders],
        })
      );
    }
  };
  const deleteFolders = async () => {
    await client.deleteFoldersFromCourse(cid as string, selectedFolders);
    let updatedFolders = JSON.parse(JSON.stringify(folders_settings?.folders));
    dispatch(
      updateFolderSettings({
        ...folders_settings,
        folders: updatedFolders.filter(
          (folder: any) => !selectedFolders.includes(folder.name)
        ),
      })
    );
    setSelectedFolders([]);
  };

  const startUpdateFolderName = (fid: string) => {
    const folder = folders_settings?.folders?.find((f) => f._id === fid);
    setEditFolderName(folder?.name ?? "");
    setEditFolder(fid);
  };

  const updateFolderName = async () => {
    const updatedFolder = await client.updateFolder(cid as string, editFolder, editFolderName);
    if (updatedFolder.hasOwnProperty("message")) {
      console.log(updatedFolder)
      if (updatedFolder.message.errmsg.includes("duplicate key error"))
        alert(`Entered folder name already present under course ${cid}`);
    } else {
      const updatedFolders = JSON.parse(
        JSON.stringify(folders_settings?.folders)
      );
      dispatch(
        updateFolderSettings({
          ...folders_settings,
          folders: updatedFolders.map((f: any) => {
            if (f._id === editFolder) {
              return { ...f, name: editFolderName };
            } else {
              return f;
            }
          }),
        })
      );
    }
    setEditFolderName("");
    setEditFolder("");
  };

  useEffect(() => {
    fetchFolders();
  }, []);

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
              defaultValue={prefix}
              onChange={(e) => setPrefix(e.target.value)}
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
              defaultValue={suffixStart}
              onChange={(e) =>
                setSuffixStart(
                  e.target.value != "" ? parseInt(e.target.value) : 0
                )
              }
              disabled={!suffix}
            />
            <label htmlFor="" className="mx-2">
              -
            </label>
            <FormControl
              className="d-inline w-10"
              defaultValue={suffixEnd}
              onChange={(e) =>
                setSuffixEnd(
                  e.target.value != "" ? parseInt(e.target.value) : 0
                )
              }
              style={{ width: "50px", textAlign: "center" }}
              disabled={!suffix}
              id="folderSuffixEnd"
            />
            <button
              className="btn btn-primary ms-2 w-25"
              onClick={createNewFolder}
            >
              Add
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Manage Folders</label>
          <span className="d-block">
            Reorder, delete, edit folder names, or create subfolders. You can
            create up to 2 levels of nesting ("subfolders" and "subfolders to
            subfolders"). Manually sort folders and subfolders using the grip
            icon . Click folder icon to show and hide subfolders.
          </span>
          <div className="d-flex flex-row justify-content-between mt-4">
            <button
              className="btn btn-sm btn-outline-primary align-items-center d-flex gap-2"
              disabled={!(selectedFolders.length > 0)}
              onClick={deleteFolders}
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
                <li
                  key={"folder_" + folder.name}
                  className="d-flex flex-row align-items-center mb-2"
                >
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFolders([...selectedFolders, folder.name]);
                      } else {
                        setSelectedFolders(
                          selectedFolders.filter(
                            (selectedFolder) => selectedFolder != folder.name
                          )
                        );
                      }
                    }}
                  />
                  <BsGripVertical className="mx-2" />
                  {editFolder !== folder?._id ? (
                    <span className="folder-pill">{folder.name}</span>
                  ) : (
                    <FormControl
                      className="w-50 form-control-sm"
                      defaultValue={editFolderName}
                      onChange={(e) => setEditFolderName(e.target.value)}
                    />
                  )}

                  <div
                    className="btn-group ms-auto"
                    role="group"
                    aria-label="Basic example"
                  >
                    {editFolder === folder?._id ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary d-flex flex-row align-items-center gap-2"
                        onClick={updateFolderName}
                      >
                        <FaCheck /> Done
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary d-flex flex-row align-items-center gap-2"
                        onClick={() => startUpdateFolderName(folder?._id ?? "")}
                      >
                        <FaPencil /> Edit
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary d-flex flex-row align-items-center gap-2"
                    >
                      <FaPlus /> Create Subfolders
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
