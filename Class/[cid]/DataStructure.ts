export type Posts = {
  _id?: string;
  post_type?: string;
  is_private?: boolean;
  is_anonymous?: boolean;
  course?: string;
  author?: string;
  folder?: string;
  summary?: string;
  details?: string;
  follow_ups?: FollowUp[];
  timestamp?: string;
  views?: number;
  answer?: Answer[];
};
type FollowUp = {
  _id?: string;
  author?: string;
  details?: string;
  is_resolved?: boolean;
  timestamp?: string;
  replies?: Replies[];
};
type Replies = {
  _id?: string;
  author?: string;
  details?: string;
  timestamp?: string;
  replies?: Replies[];
};

type Answer = {
  _id: string;
  author: string;
  details: string;
  timestamp: string;
};
