import { atom } from "recoil";

import { CommentList } from "../interface/comment";

export const commentListState = atom({
  key: "commentListState",
  default: [] as CommentList[],
});
