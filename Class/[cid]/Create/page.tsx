"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams, redirect } from "next/navigation";
import Editor from "react-simple-wysiwyg";
import { Form, Button, Badge, Alert, Row, Col } from "react-bootstrap";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import type { storeType } from "../../../store";
import {
    setPostType,
    setPostTo,
    toggleSelectedUser,
    toggleSelectedFolder,
    setSummary,
    setDetails,
    setSendEmailNotifications,
    setPosterName,
    setIsPrivate,
    setErrors,
    clearFieldError,
    resetForm,
} from "./reducer";
import { addPost as addPostToClassReducer, setPosts } from "../reducer";
import { createPost } from "../client";
import { getInstructorsForCourse } from "../client";
import Link from "next/link";

type PostType = "question" | "note" | "poll";
type PostTo = "entire-class" | "instructor";

export default function NewPostScreen() {
    const [instructors, setInstructors] = useState<
        Array<{ _id: string; firstName: string; lastName: string }>
    >([]);

    const dispatch = useDispatch();
    const { cid } = useParams();
    const router = useRouter();
    const { formData, errors } = useSelector(
        (state: storeType) => state.newPostReducer
    );
    const { currentUser } = useSelector(
        (state: storeType) => state.accountReducer
    );

    const { items } = useSelector((state: storeType) => state.filter);

    const folders = items.map((item) => ({
        id: item._id,
        name: item.name,
    }));

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const data = await getInstructorsForCourse(cid as string);
                setInstructors(data);
            } catch (error) {
                console.error("Error fetching instructors:", error);
            }
        };
        fetchInstructors();
    }, [cid]);

    const handleFolderToggle = (folderId: string) => {
        dispatch(toggleSelectedFolder(folderId));
        if (errors.folders && formData.selectedFolders.length > 0) {
            dispatch(clearFieldError("folders"));
        }
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

    const handlePost = async () => {
        if (!validateForm()) {
            return;
        }

        const audience =
            formData.postTo === "entire-class"
                ? ["ALL"]
                : formData.selectedUsers.length === 0
                ? ["ALL"]
                : [...formData.selectedUsers];

        const postData = {
            post_type: formData.postType.toUpperCase() as
                | "QUESTION"
                | "NOTE"
                | "POLL",
            post_to: formData.postTo,
            selected_users:
                formData.postTo === "instructor" ? formData.selectedUsers : [],
            folder: { name: formData.selectedFolders[0] },
            summary: formData.summary,
            details: formData.details,
            send_email_notifications: formData.sendEmailNotifications,
            author_name: formData.userName,
            is_private: formData.isPrivate,
            course: Array.isArray(cid) ? cid[0] : cid,
            timestamp: new Date().toISOString(),
            read_by: [],
            audience,
        };

        try {
            const response = await createPost(postData);
            dispatch(addPostToClassReducer(response));
            dispatch(resetForm());
            router.push(`/Pazza/Class/${cid}`);
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        }
    };

    const handleCancel = () => {
        dispatch(resetForm());
        redirect(`/Pazza/Class/${cid}`);
    };

    const getPostButtonText = () => {
        if (formData.postType === "question") return "Post My Question";
        if (formData.postType === "note") return "Post My Note";
        return "Post";
    };

    return (
        <div>
            <div className="d-flex justify-contents-between  gap-2">
                <Link href={`/Pazza/Class/${cid}`}>
                    <IoArrowBackOutline className="text-primary fs-3  " />
                </Link>
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
                                    dispatch(
                                        setPostType(e.target.value as PostType)
                                    )
                                }
                                label={
                                    <div>
                                        <strong>Question</strong> <br />
                                        <span className="text-muted">
                                            if you need an answer
                                        </span>
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
                                    dispatch(
                                        setPostType(e.target.value as PostType)
                                    )
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
                                disabled
                                checked={formData.postType === "poll"}
                                onChange={(e) =>
                                    dispatch(
                                        setPostType(e.target.value as PostType)
                                    )
                                }
                                label={
                                    <div>
                                        <strong>Poll/In-Class Response</strong>{" "}
                                        <br />
                                        <span className="text-muted">
                                            if you need a vote
                                        </span>
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
                                onChange={(e) =>
                                    dispatch(
                                        setPostTo(e.target.value as PostTo)
                                    )
                                }
                            />
                            <Form.Check
                                type="radio"
                                id="postTo-instructor"
                                name="postTo"
                                value="instructor"
                                label="Instructor(s)"
                                checked={formData.postTo === "instructor"}
                                onChange={(e) =>
                                    dispatch(
                                        setPostTo(e.target.value as PostTo)
                                    )
                                }
                            />
                            {/* User Selection Control */}
                            {formData.postTo === "instructor" && (
                                <div>
                                    <Form.Select
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                dispatch(
                                                    toggleSelectedUser(
                                                        e.target.value
                                                    )
                                                );
                                                e.target.value = "";
                                            }
                                        }}
                                    >
                                        <option value="">
                                            Select an instructor...
                                        </option>
                                        {instructors.map((instructor) => (
                                            <option
                                                key={instructor._id}
                                                value={instructor._id}
                                            >
                                                {instructor.firstName}{" "}
                                                {instructor.lastName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <div className="mt-2 d-flex flex-wrap gap-2">
                                        {formData.selectedUsers.map(
                                            (audienceId) => {
                                                const instructor =
                                                    instructors.find(
                                                        (i) =>
                                                            i._id === audienceId
                                                    );
                                                return (
                                                    <Badge
                                                        key={audienceId}
                                                        bg="info"
                                                        className="d-flex align-items-center gap-2"
                                                    >
                                                        {instructor?.firstName}{" "}
                                                        {instructor?.lastName}
                                                        <FaTimes
                                                            onClick={() =>
                                                                dispatch(
                                                                    toggleSelectedUser(
                                                                        audienceId
                                                                    )
                                                                )
                                                            }
                                                        ></FaTimes>
                                                    </Badge>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                            {formData.postTo === "entire-class" && (
                                <div>
                                    <Form.Text className="text-muted small">
                                        This post will be visible to all
                                        students in the class.
                                    </Form.Text>
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
                                        formData.selectedFolders.includes(
                                            folder.id
                                        )
                                            ? "primary"
                                            : "secondary"
                                    }
                                    onClick={() =>
                                        handleFolderToggle(folder.id)
                                    }
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
                            <Editor
                                value={formData.details}
                                onChange={handleDetailsChange}
                            />
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
                    <Form.Label className="fw-bold mb-0">
                        Posting Options
                    </Form.Label>
                </Col>
                <Col xs={12} md={8}>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            id="sendEmailNotifications"
                            label={
                                <small>
                                    Send email notifications immediately
                                    (bypassing students' email preferences, if
                                    necessary)
                                </small>
                            }
                            checked={formData.sendEmailNotifications}
                            onChange={(e) =>
                                dispatch(
                                    setSendEmailNotifications(e.target.checked)
                                )
                            }
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} md={2}>
                    <Form.Label className="fw-bold mb-0">
                        Show my name as
                    </Form.Label>
                </Col>
                <Col xs={12} md={8}>
                    <Form.Group>
                        <Form.Select
                            value={formData.userName}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                dispatch(setPosterName(selectedValue));
                                const isPrivate = selectedValue === "Anonymous";
                                dispatch(setIsPrivate(isPrivate));
                            }}
                        >
                            {currentUser && (
                                <option
                                    value={`${currentUser.firstName} ${currentUser.lastName}`}
                                >
                                    {currentUser.firstName}{" "}
                                    {currentUser.lastName}
                                </option>
                            )}
                            <option value="Anonymous">Anonymous</option>
                        </Form.Select>
                        <Form.Text className="d-block mt-2 text-muted small">
                            {formData.isPrivate
                                ? "Your name is hidden from classmates"
                                : "Your name is visible to classmates"}
                        </Form.Text>
                    </Form.Group>
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
