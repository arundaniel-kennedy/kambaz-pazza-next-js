export default interface ClassDetails {
    class_info?: {
        course_number?: string;
        course_name?: string;
        class_term?: string;
        start_date?: string;
        singup_link?: string;
        access_code?: string[];
        class_link?: string;
        instructor_self_signup?: boolean;
        class_status?: boolean;
        schedule_lock_time?: string[];
    },
    qa_info?: {
        posting_anonymously?: boolean;
        private_posts?: boolean;
        private_posts__as_default?: boolean;
        private_posts__only?: boolean;
        syntax_highlighting_within_pre_tags?: boolean;
        runnable_code_snippets?: boolean;
        runnable_code_snippets__default_language?: string;
        student_polls_allowed?: boolean;
        context_aware_copy_paste?: boolean;
        instructor_tagging_in_posts?: boolean;
        instructor_tagging_in_posts__by_students?: boolean;
        collaborative_post_editing_for_students?: boolean;
        duplicate_post_suggestions?: boolean;
        resolved_unresolved_toggle_on_followups?: boolean;
        reading_list?: boolean;
        timer_delays?: boolean;
        ai_summary_language?: string;
        ai_followup_summarization?: boolean;
        ai_folder_summarization?: boolean;
    },
    folders_settings?: {
        enable_folders?: boolean;
        folders?: {
            _id?: string;
            name: string;
            course?: string;
        }[];
    },
    enrollment?: {
        instructors?: {
            name: string;
            email: string;
            alternate_email?: string;
        }[];
        students?: {
            name: string;
            email: string;
            alternate_email?: string;
        }[];
        add_drop_students?: boolean;
    },
    group_settings?: {
        groups?: {
            group_members: string[];
        }[];
        allow_students_to_join_group?: boolean;
    },
    course_page_settings?: {
        default_resource_size?: string;
        visibility_settings__announcements?: boolean;
        visibility_settings__homework?: boolean;
        visibility_settings__homework_solutions?: boolean;
        visibility_settings__lecture_notes?: boolean;
        visibility_settings__general_resources?: boolean;
    },
    pazza_network_settings?: {
        intro_post_to_students: string;
        top_student_badge: boolean;
    }
}