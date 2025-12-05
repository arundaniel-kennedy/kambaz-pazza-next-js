"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { storeType } from "../../../store";
import { updateQaInfo } from "../data/reducer";

export default function QandASettings() {
  const { qa_info } = useSelector(
    (state: storeType) => state.classConfigureReducer
  );
  const dispatch = useDispatch();
  return (
    <div className="class-manage-content qa-info-wrapper" id="QnASettings">
      <div className="blue-info-box">
        <p>Fine tune your class Q&A by enabling private or anonymous posts.</p>
      </div>
      <div className="content">
        <h2>Q&A Settings</h2>
        <div className="form-group">
          <label htmlFor="">Posting Anonymously:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.posting_anonymously}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  posting_anonymously: !qa_info?.posting_anonymously,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled:</b> Students can show up as "Anonymous" to both
            classmates and instructors.
          </small>
          <small>
            <b>If Disabled:</b> Students can show up as "Anonymous" to
            classmates, but not to instructors.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Private Posts:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.private_posts}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  private_posts: !qa_info?.private_posts,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled:</b> Instructors and students will be able to post
            privately to instructors.
          </small>
          <small>
            <b>If Disabled:</b> Only instructors will be able to post privately
            to instructors.
          </small>
          <div className="form-group">
            <label htmlFor="">Private Posts as Default</label>
            <Form.Check
              type="checkbox"
              className="d-inline ms-2"
              defaultChecked={qa_info?.private_posts__as_default}
              onChange={(e) =>
                dispatch(
                  updateQaInfo({
                    ...qa_info,
                    private_posts__as_default:
                      !qa_info?.private_posts__as_default,
                  })
                )
              }
            />
            <small className="d-block">
              <b>If Enabled:</b> The "post to" option will default to post
              privately to instructors
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="">Only Allow Private Posts</label>
            <Form.Check
              type="checkbox"
              className="d-inline ms-2"
              defaultChecked={qa_info?.private_posts__only}
              onChange={(e) =>
                dispatch(
                  updateQaInfo({
                    ...qa_info,
                    private_posts__only: !qa_info?.private_posts__only,
                  })
                )
              }
            />
            <small className="d-block">
              <b>If Enabled:</b> Students will only be allowed to post privately
              to instructors. Instructors can change private posts into
              anonymous public posts.
            </small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Syntax Highlighting within {`<pre>`} tags:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.syntax_highlighting_within_pre_tags}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  syntax_highlighting_within_pre_tags:
                    !qa_info?.syntax_highlighting_within_pre_tags,
                })
              )
            }
          />
          <small className="d-block">
            If our syntax highlighter doesn't make sense for your class, you can
            disable this feature here
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Runnable Code Snippets:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.runnable_code_snippets}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  runnable_code_snippets: !qa_info?.runnable_code_snippets,
                })
              )
            }
          />
          <small className="d-block">
            Instructors and students can run code snippets on published posts.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Student Polls:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.student_polls_allowed}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  student_polls_allowed: !qa_info?.student_polls_allowed,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled: </b>Instructors and students will be able to post
            polls.
          </small>
          <small className="d-block">
            <b>If Disable: </b>Only instructors will be able to post polls.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Context-Aware Copy-Paste:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.context_aware_copy_paste}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  context_aware_copy_paste: !qa_info?.context_aware_copy_paste,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled: </b>Text copied and pasted within your class will
            include attribution (author and post number) and use block quote
            formatting.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Instructor Tagging in Posts:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.instructor_tagging_in_posts}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  instructor_tagging_in_posts:
                    !qa_info?.instructor_tagging_in_posts,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled: </b>Instructors will be able to tag fellow
            instructors in posts.
          </small>
          <small className="d-block">
            <b>If Disabled: </b>No one will be able to tag instructors in posts.
          </small>
          <div className="form-group">
            <label htmlFor="">Students can tag instructors</label>
            <Form.Check
              type="checkbox"
              className="d-inline ms-2"
              defaultChecked={qa_info?.instructor_tagging_in_posts__by_students}
              onChange={(e) =>
                dispatch(
                  updateQaInfo({
                    ...qa_info,
                    instructor_tagging_in_posts__by_students:
                      !qa_info?.instructor_tagging_in_posts__by_students,
                  })
                )
              }
            />
            <small className="d-block">
              <b>If Enabled:</b> Students will be also able to tag instructors
              in posts.
            </small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Collaborative Post Editing for students:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.collaborative_post_editing_for_students}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  collaborative_post_editing_for_students:
                    !qa_info?.collaborative_post_editing_for_students,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled: </b>Students can collaborate and edit other students'
            questions, notes, and polls.
          </small>
          <small className="d-block">
            <b>If Disabled: </b>Students can only edit their own questions,
            notes, and polls.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Duplicate Post Suggestions:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.collaborative_post_editing_for_students}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  collaborative_post_editing_for_students:
                    !qa_info?.collaborative_post_editing_for_students,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled:</b>When instructors and students are posting, they
            will be prompted with suggestions of posts that may be similar.
          </small>
          <small className="d-block">
            <b>If Disabled:</b> Instructors and students will not be prompted
            with post suggestions. notes, and polls.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Resolved/Unresolved Toggle on Followups:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.resolved_unresolved_toggle_on_followups}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  resolved_unresolved_toggle_on_followups:
                    !qa_info?.resolved_unresolved_toggle_on_followups,
                })
              )
            }
          />
          <small className="d-block">
            If resolved/unresolved designators for followups are irrelevant,
            disable these actions (recommended when students use followups to
            generate discussions with no single "right" answer). To display
            followup count in your feed, click "Show Followup Count" in the
            dropdown menu above your feed.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Reading List:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.reading_list}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  reading_list: !qa_info?.reading_list,
                })
              )
            }
          />
          <small className="d-block">
            <b>If Enabled:</b> Help your students catch up if they haven't been
            keeping up-to-date on Piazza posts in your class, by flagging posts
            as part of their Reading List. You can set an additional flag that
            requires a student to have read the post before they can create a
            new one. Reading List posts appear in a "my reading list" bin for
            students’ easy access, right below the "pinned" bin.
          </small>
          <small className="d-block">
            <b>If Disabled:</b> Instructors are not able to add posts to a
            reading list.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="">Timer Delays:</label>
          <Form.Check
            type="switch"
            className="d-inline ms-2"
            defaultChecked={qa_info?.timer_delays}
            onChange={(e) =>
              dispatch(
                updateQaInfo({
                  ...qa_info,
                  timer_delays: !qa_info?.timer_delays,
                })
              )
            }
          />
          <small className="d-block">
            Timer delays allow instructors to hold off on answering student questions immediately, thereby encouraging other students to answer questions in the meanwhile. You can see when the timers are up and questions are due to be answered. Only instructors can see the timer.
          </small>
        </div>
        <button className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
}
