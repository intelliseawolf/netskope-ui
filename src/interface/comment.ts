export interface Comment {
  name: string;
  comment: string;
}

export interface CommentList {
  movieId: string;
  comments: Comment[];
}
