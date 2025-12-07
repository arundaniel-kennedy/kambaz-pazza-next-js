import { createSlice } from "@reduxjs/toolkit";
import ClassDetails from "./DataStructure";

const initialState: ClassDetails = {
    class_info: {
        course_number: "CS5610",
        course_name: "Web Dev",
        class_term: "Fall 2025",
        start_date: "2025-09-01",
        singup_link: "https://piazza.com/northeastern/fall2025/cs5610Jose",
        access_code: [],
        class_link: "https://piazza.com/northeastern/fall2025/cs5610Jose/home",
        instructor_self_signup: false,
        class_status: true,
        schedule_lock_time: [],
    },
    qa_info: {
        posting_anonymously: false,
        private_posts: true,
        private_posts__as_default: false,
        private_posts__only: false,
        syntax_highlighting_within_pre_tags: true,
        runnable_code_snippets: true,
        runnable_code_snippets__default_language: "javascript",
        student_polls_allowed: true,
        context_aware_copy_paste: false,
        instructor_tagging_in_posts: true,
        instructor_tagging_in_posts__by_students: false,
        collaborative_post_editing_for_students: true,
        duplicate_post_suggestions: true,
        resolved_unresolved_toggle_on_followups: true,
        reading_list: false,
        timer_delays: false,
        ai_summary_language: "en",
        ai_followup_summarization: false,
        ai_folder_summarization: false,
    },
    folders_settings: {
        enable_folders: true,
        folders: [{
            name: "HW1"
        }]
    },
    enrollment: {
        instructors: [{
            name: "Kennedy, Arun Daniel",
            email: "kennedy.ar@northeastern.edu",
            alternate_email: "arundanielkennedy@gmail.com",
        }],
        students: [{
            name: "Gurumurthy, Ashwin",
            email: "gurumurthy.ash@northeastern.edu"
        }],
        add_drop_students: false
    }
};

const classConfigureSlice = createSlice({
    name: "classconfigure",
    initialState,
    reducers: {
        updateClassInfo: (state, { payload: class_info }) => {
            state.class_info = class_info
        },
        updateQaInfo: (state, { payload: qa_info }) => {
            state.qa_info = qa_info
        },
        updateFolderSettings: (state, { payload: folders_settings }) => {
            state.folders_settings = folders_settings
        }
    },
});
export const { updateClassInfo, updateQaInfo, updateFolderSettings } = classConfigureSlice.actions;
export default classConfigureSlice.reducer;