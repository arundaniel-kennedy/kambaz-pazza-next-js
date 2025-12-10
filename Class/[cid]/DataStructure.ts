export interface User {
    _id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    dob: string,
    role: string,
    loginId: string,
    section: string,
    lastActivity: string,
    totalActivity: string,
}
export type Posts = {
  _id?: string;
  post_type?: string;
  is_private?: boolean;
  is_anonymous?: boolean;
  course?: string;
  author?: User;
  folder?: string;
  summary?: string;
  details?: string;
  follow_ups?: FollowUp[];
  timestamp?: string;
  views?: number;
  answer?: Answer[];
  read_by?:string[];
};
export type FollowUp = {
  _id?: string;
  author?: string;
  details?: string;
  is_resolved?: boolean;
  timestamp?: string;
  replies?: Replies[];
};
export type Replies = {
  _id?: string;
  author?: string;
  details?: string;
  timestamp?: string;
  replies?: Replies[];
};

export type Answer = {
  _id: string;
  author: string;
  details: string;
  timestamp: string;
};
