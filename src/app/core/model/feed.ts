export interface Feed {
  type: string;
  title: string;
  content: string;
  contentId: number;
  author: string;
  authorId: number;
  lastModifiedDate: Date;
  comments: Comment[];
  owner: boolean;
  image: string;
}

export interface Comment {
  id: number;
  author: string;
  authorId: number;
  post: number;
  content: string;
}
