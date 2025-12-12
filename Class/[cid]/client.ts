import axios from "axios";
import { Answer, FollowUp, Posts, Replies } from "./DataStructure";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const axiosWithCredentials = axios.create({ withCredentials: true });

const PAZZA_API = `${HTTP_SERVER}/api/pazza`;
const POSTS_API = `${PAZZA_API}/posts`;
const USERS_API = `${HTTP_SERVER}/api/users`;

//All Post APIs
// ******************************
//(Ashwin)
export async function createPost(post: Partial<Posts>) {
    const newPost = await axiosWithCredentials.post(`${POSTS_API}`, post);
    return newPost.data;
}

export async function getPostsForFilter(courseId: string, folderId: string) {
    const posts = await axiosWithCredentials.get(
        `${PAZZA_API}/${courseId}/folders/${folderId}`
    );
    return posts.data;
}

export async function getAllInstructors() {
    const role = "FACULTY";
    const { data: instructors } = await axiosWithCredentials.get(
        `${USERS_API}?role=${role}`
    );
    return instructors;
}

export async function getInstructorsForCourse(courseId: string) {
    const { data: instructors } = await axiosWithCredentials.get(
        `${USERS_API}/instructors/${courseId}`
    );
    return instructors;
}

export async function getEveryone() {
    const { data: users } = await axiosWithCredentials.get(`${USERS_API}`);
    return users;
}

export async function getFolders() {
    const folders = await axios.get(`${PAZZA_API}/folders`);
    return folders.data;
}

//-----------------------------
// ******************************
//(Arth)

// ************** Direct post operations ****************
export async function getAllPostsForCourse(courseId: string) {
    const posts = await axiosWithCredentials.get(
        `${PAZZA_API}/${courseId}/posts`
    );
    return posts.data;
}

export async function getPost(postId: string) {
    const post = await axiosWithCredentials.get(`${POSTS_API}/${postId}`);
    // console.log("This is client post",post.data);
    return post.data;
}

export async function readPost(postId: string) {
    const response = await axiosWithCredentials.put(
        `${POSTS_API}/${postId}/views`
    );
    return response.data;
}

export async function editPost(postId: string | undefined, postUpdates: Posts) {
    const updatedPost = await axiosWithCredentials.put(
        `${POSTS_API}/${postId}`,
        postUpdates
    );
    return updatedPost.data;
}

export async function deletePost(postId: string | undefined) {
    await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
}

// ************** Post answer operations ****************
export async function createStudentAnswerToPost(
    postId: string,
    answer: Answer
) {
    const newAnswer = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/student_answer`,
        answer
    );
    return newAnswer.data;
}

export async function createInstructorAnswerToPost(
    postId: string,
    answer: Answer
) {
    const newAnswer = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/instructor_answer`,
        answer
    );
    return newAnswer.data;
}

export async function editAnswer(answerId: string, answer: Answer) {
    const newAnswer = await axiosWithCredentials.put(
        `${POSTS_API}/answer/${answerId}`,
        answer
    );
    return newAnswer.data;
}

export async function deleteStudentAnswer(postId: string, answerId: string) {
    const response = await axiosWithCredentials.delete(`${POSTS_API}/${postId}/student_answer/${answerId}`)
    return response.data
}

export async function deleteInstructorAnswer(postId: string, answerId: string) {
    const response = await axiosWithCredentials.delete(`${POSTS_API}/${postId}/instructor_answer/${answerId}`)
    return response.data
}

// ************** Follow up operations ****************
export async function createFollowupToPost(postId: string, followup: FollowUp) {
    const newFollowup = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/followup`,
        followup
    );
    return newFollowup.data;
}

export async function createReplyToFollowup(
    postId: string,
    followupId: string,
    reply: Replies
) {
    const newReply = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/followup/${followupId}/reply`,
        reply
    );

    return newReply.data;
}

export async function createReplyToReply(
    postId: string,
    followupId: string,
    replyId: string,
    reply: Replies
) {
    const newReply = await axiosWithCredentials.post(
        `${POSTS_API}/${postId}/followup/${followupId}/reply/${replyId}`,
        reply
    );
    return newReply.data;
}

export async function editFollowup(
    postId: string,
    followupId: string,
    followup: FollowUp
) {
    const response = await axiosWithCredentials.put(
        `${POSTS_API}/${postId}/followup/${followupId}`,
        followup
    );
    return response.data;
}

export async function deleteFollowup(postId: string, followupId: string) {
    const response = await axiosWithCredentials.delete(
        `${POSTS_API}/${postId}/followup/${followupId}`
    );
    return response.data;
}

export async function editReplyToFollowup(
    postId: string,
    followupId: string,
    replyId: string,
    reply: Replies
) {
    const response = await axiosWithCredentials.put(
        `${POSTS_API}/${postId}/followup/${followupId}/reply/${replyId}`,
        reply
    );
    return response.data;
}

export async function editReplyToReply(
    postId: string,
    followupId: string,
    parentReplyId: string,
    replyId: string,
    reply: Replies
) {
    const response = await axiosWithCredentials.put(
        `${POSTS_API}/${postId}/followup/${followupId}/reply/${parentReplyId}/${replyId}`,
        reply
    );
    return response.data;
}

export async function deleteReplyToFollowup(
    postId: string,
    followupId: string,
    replyId: string
) {
    const response = await axiosWithCredentials.delete(
        `${POSTS_API}/${postId}/followup/${followupId}/reply/${replyId}`
    );
    return response.data;
}

export async function deleteReplyToReply(
    postId: string,
    followupId: string,
    parentReplyId: string,
    replyId: string
) {
    const response = await axiosWithCredentials.delete(
        `${POSTS_API}/${postId}/followup/${followupId}/reply/${parentReplyId}/${replyId}`
    );
    return response.data;
}
