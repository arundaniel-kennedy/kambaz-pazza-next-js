import { User } from "@/app/(Kambaz)/Account/reducer";

export type Posts = {
  _id?: string;
  post_type?: string;
  is_private?: boolean;
  is_anonymous?: boolean;
  course?: string;
  author?: User;
  folder?: Folder;
  summary?: string;
  details?: string;
  follow_ups?: FollowUp[];
  timestamp?: string;
  views?: number;
  student_answer?: Answer;
  instructor_answer?: Answer;
  read_by?: string[];
};
export type FollowUp = {
  _id?: string;
  author?: User;
  details?: string;
  is_resolved?: boolean;
  timestamp?: string;
  replies?: Replies[];
};
export type Replies = {
  _id?: string;
  author?: User;
  details?: string;
  timestamp?: string;
  replies?: Replies[];
};

export type Answer = {
  _id?: string;
  author?: User;
  details: string;
  timestamp?: string;
};

export type Folder = {
  _id?: string;
  name: string;
  course?: string;
}