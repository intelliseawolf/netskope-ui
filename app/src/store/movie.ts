import { atom } from "recoil";

import type { MovieItem } from "../interface/movie";

export const movieListState = atom({
  key: "movieListState",
  default: [] as MovieItem[],
});
