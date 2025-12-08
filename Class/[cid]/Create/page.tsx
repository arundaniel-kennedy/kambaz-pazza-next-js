"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "react-simple-wysiwyg";
import {
  Container,
  Form,
  Button,
  Badge,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import filterData from "../../../../(Kambaz)/Database/filterData.json";
import type { storeType } from "../../../store";
import {
  setPostType,
  setPostTo,
  toggleSelectedUser,
  toggleSelectedFolder,
  setSummary,
  setDetails,
  setSendEmailNotifications,
  setErrors,
  clearFieldError,
  addPost,
  resetForm,
} from "./reducer";

type PostType = "question" | "note" | "poll";
type PostTo = "entire-class" | "individual";

interface User {
  id: string;
  name: string;
  type: "instructor" | "student";
}

interface Folder {
  id: string;
  name: string;
}

export default function NewPostScreen() {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector(
    (state: storeType) => state.newPostReducer
  );

  const users: User[] = [
    { id: "instructor1", name: "Instructor 1", type: "instructor" },
    { id: "instructor2", name: "Instructor 2", type: "instructor" },
    { id: "student1", name: "Student 1", type: "student" },
    { id: "student2", name: "Student 2", type: "student" },
    { id: "student3", name: "Student 3", type: "student" },
  ];

  const instructors = users.filter((u) => u.type === "instructor");
  const allUsers = users;

  const folders: Folder[] = (
    filterData as Array<{ label: string; count?: number }>
  ).map((item) => ({
    id: item.label,
    name: item.label,
  }));

  const handleFolderToggle = (folderId: string) => {
    dispatch(toggleSelectedFolder(folderId));
    if (errors.folders && formData.selectedFolders.length > 0) {
      dispatch(clearFieldError("folders"));
    }
  };

  const handleUserToggle = (userId: string) => {
    dispatch(toggleSelectedUser(userId));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 100) {
      dispatch(setSummary(value));
    }
  };

  const handleDetailsChange = (e: { target: { value: string } }) => {
    dispatch(setDetails(e.target.value));
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (formData.selectedFolders.length === 0) {
      newErrors.folders = "At least one folder is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details is required";
    }

    dispatch(setErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handlePost = () => {
    if (!validateForm()) {
      return;
    }

    const postData = {
      id: Date.now().toString(),
      postType: formData.postType as PostType,
      postTo: formData.postTo as PostTo,
      selectedUsers:
        formData.postTo === "individual" ? formData.selectedUsers : [],
      selectedFolders: formData.selectedFolders,
      summary: formData.summary,
      details: formData.details,
      sendEmailNotifications: formData.sendEmailNotifications,
    };

    dispatch(addPost(postData));
    dispatch(resetForm());
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  const getPostButtonText = () => {
    if (formData.postType === "question") return "Post My Question";
    if (formData.postType === "note") return "Post My Note";
    return "Post";
  };

  return (
    <div>
      <div className="d-flex justify-contents-between  gap-2">
        <IoArrowBackOutline className="text-primary fs-3  " />
        <FaPlusCircle className="bg-white fs-5" />
        <h5>Create New Post</h5>
      </div>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">
            Post Type<span className="text-danger">*</span>
          </Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Group>
            <div className="d-flex flex-row gap-2">
              <Form.Check
                type="radio"
                id="postType-question"
                name="postType"
                value="question"
                checked={formData.postType === "question"}
                onChange={(e) =>
                  dispatch(setPostType(e.target.value as PostType))
                }
                label={
                  <div>
                    <strong>Question</strong> <br />
                    <span className="text-muted">if you need an answer</span>
                  </div>
                }
              />
              <Form.Check
                type="radio"
                id="postType-note"
                name="postType"
                value="note"
                checked={formData.postType === "note"}
                onChange={(e) =>
                  dispatch(setPostType(e.target.value as PostType))
                }
                label={
                  <div>
                    <strong>Note</strong> <br />
                    <span className="text-muted">
                      if you don't need an answer
                    </span>
                  </div>
                }
              />
              <Form.Check
                type="radio"
                id="postType-poll"
                name="postType"
                value="poll"
                checked={formData.postType === "poll"}
                onChange={(e) =>
                  dispatch(setPostType(e.target.value as PostType))
                }
                label={
                  <div>
                    <strong>Poll/In-Class Response</strong> <br />
                    <span className="text-muted">if you need a vote</span>
                  </div>
                }
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">
            Post To<span className="text-danger">*</span>
          </Form.Label>
        </Col>
        <Col cxs={12} md={8}>
          <Form.Group>
            <div className="d-flex flex-row gap-2">
              <Form.Check
                type="radio"
                id="postTo-entire-class"
                name="postTo"
                value="entire-class"
                label="Entire Class"
                checked={formData.postTo === "entire-class"}
                onChange={(e) => dispatch(setPostTo(e.target.value as PostTo))}
              />
              <Form.Check
                type="radio"
                id="postTo-individual"
                name="postTo"
                value="instructor"
                label="Instructor(s)"
                checked={formData.postTo === "individual"}
                onChange={(e) => dispatch(setPostTo(e.target.value as PostTo))}
              />
              {/* User Selection Control */}
              {formData.postTo === "individual" && (
                <div className="ms-3 border rounded p-2 bg-light mt-2">
                  <div className="mb-2">
                    <Form.Label className="fw-medium small">
                      Instructors
                    </Form.Label>
                    <div className="d-flex flex-row gap-1">
                      {instructors.map((user) => (
                        <Form.Check
                          key={user.id}
                          type="checkbox"
                          id={`user-${user.id}`}
                          label={<small>{user.name}</small>}
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserToggle(user.id)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Form.Label className="fw-medium small">
                      All Users
                    </Form.Label>
                    <div className="d-flex flex-row gap-1">
                      {allUsers.map((user) => (
                        <Form.Check
                          key={user.id}
                          type="checkbox"
                          id={`user-all-${user.id}`}
                          label={<small>{user.name}</small>}
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserToggle(user.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">
            Select Folder(s)<span className="text-danger">*</span>
          </Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Group>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {folders.map((folder) => (
                <Badge
                  key={folder.id}
                  as="button"
                  type="button"
                  bg={
                    formData.selectedFolders.includes(folder.id)
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => handleFolderToggle(folder.id)}
                  className="border-0"
                >
                  {folder.name}
                </Badge>
              ))}
            </div>
            {errors.folders && (
              <Alert variant="danger" className="mt-2 py-2 small">
                {errors.folders}
              </Alert>
            )}
            <Form.Text className="d-block">
              <a
                href="#"
                className="text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Navigate to Manage Folders
                  console.log("Navigate to Manage Folders");
                }}
              >
                Manage and reorder folders
              </a>
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">
            Summary<span className="text-danger">*</span>
          </Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Group>
            <Form.Control
              type="text"
              value={formData.summary}
              onChange={handleSummaryChange}
              placeholder="Enter a one line summary, 100 characters or less"
              maxLength={100}
              isInvalid={!!errors.summary}
            />
            <div className="d-flex justify-content-between align-items-center mt-1">
              {errors.summary && (
                <Form.Text className="text-danger small">
                  {errors.summary}
                </Form.Text>
              )}
              <Form.Text className="text-muted ms-auto small">
                {formData.summary.length}/100
              </Form.Text>
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">
            Details<span className="text-danger">*</span>
          </Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Group>
            <div
              className={
                errors.details
                  ? "border border-danger rounded"
                  : "border rounded"
              }
            >
              <Editor value={formData.details} onChange={handleDetailsChange} />
            </div>
            {errors.details && (
              <Form.Text className="text-danger d-block mt-1 small">
                {errors.details}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">Posting Options</Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Group>
            <Form.Check
              type="checkbox"
              id="sendEmailNotifications"
              label={
                <small>
                  Send email notifications immediately (bypassing students'
                  email preferences, if necessary)
                </small>
              }
              checked={formData.sendEmailNotifications}
              onChange={(e) =>
                dispatch(setSendEmailNotifications(e.target.checked))
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold mb-0">Show my name as</Form.Label>
        </Col>
        <Col xs={12} md={8}>
          {/* Add form control here if needed */}
        </Col>
      </Row>

      {/* Required Fields Indicator */}
      <Form.Text className="text-muted d-block mb-4">
        <span className="text-danger">*</span> Required fields
      </Form.Text>

      {/* Action Buttons */}
      <div className="d-flex gap-3">
        <Button variant="primary" onClick={handlePost} type="button">
          {getPostButtonText()}
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
