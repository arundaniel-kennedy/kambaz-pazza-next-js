import axios from "axios";
import { Answer, FollowUp, Posts, Replies } from "./DataStructure";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const axiosWithCredentials = axios.create({ withCredentials: true });

const PAZZA_API = `${HTTP_SERVER}/api/pazza`;
const POSTS_API = `/${PAZZA_API}/posts`;

//All Post APIs
// ******************************
//(Ashwin)



//-----------------------------
// ******************************
//(Arth)
export async function getAllPostsForCourse(courseId: string) {
  const posts = await axios.get(`${PAZZA_API}/${courseId}/posts`);
  return posts;
}

export async function getPost(postId: string) {
  const post = await axios.get(`${POSTS_API}/${postId}`);
  return post;
}

export async function getViews(postId: string) {
  const views = await axios.get(`${POSTS_API}/views/${postId}`);
  return views;
}

export async function readPost(postId: string) {
  const response = await axiosWithCredentials.put(
    `${POSTS_API}/views/${postId}`
  );
  return response;
}

export async function editPost(postId: string, postUpdates: Posts) {
  const updatedPost = await axiosWithCredentials.put(
    `${POSTS_API}/${postId}`,
    postUpdates
  );
  return updatedPost;
}

export async function createFollowupToPost(
  postId: string,
  followupId: string,
  followup: FollowUp
) {
  const newFollowup = await axiosWithCredentials.post(
    `${POSTS_API}/followup/${postId}`,
    followup
  );
  return newFollowup;
}
export async function createReplyToFollowup(
  postId: string,
  followupId: string,
  reply: Replies
) {
  const newReply = await axiosWithCredentials.post(
    `${POSTS_API}/reply/${postId}/${followupId}`,
    reply
  );
  return newReply;
}

export async function createReplyToReply(
  postId: string,
  followupId: string,
  replyId: string,
  reply: Replies
) {
  const newReply = await axiosWithCredentials.post(
    `${POSTS_API}/reply/${postId}/${followupId}/${replyId}`,
    reply
  );
  return newReply;
}

export async function createAnswerToPost(postId:string,answer:Answer) {
    const newAnswer = await axiosWithCredentials.post(
    `${POSTS_API}/answer/${postId}`,
    answer
  );
  return newAnswer;
}

export async function editAnswer(answerId:string,answer:Answer) {
    const newAnswer = await axiosWithCredentials.put(
    `${POSTS_API}/answer/${answerId}`,
    answer
  );
  return newAnswer;
}
