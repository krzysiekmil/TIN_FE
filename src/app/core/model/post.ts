import {Comment} from "./comment";

export interface Post {
  id: number;
  title: string;
  content: string;
  url: string;
  authorId: number;
  author: string;
  animal: string;
  animalId: number;
  comments: Comment[];
  image: string;
}
