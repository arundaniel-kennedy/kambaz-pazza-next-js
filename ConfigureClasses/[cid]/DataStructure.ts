export default interface ClassDetails {
    class_info?: {
        course_number?: string;
        course_name?: string;
        class_term?: string;
        start_date?: string;
        singup_link?: string;
        instructor_self_signup?: boolean;
        class_status?: boolean;
        schedule_lock_time?: string[]
    }
}