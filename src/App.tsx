import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";

import CustomSpinner from "./components/Spinner";
import Layout from "./containers/Layout";
import Home from "./containers/Home";
import MovieDetail from "./containers/MovieDetail";

import type { MovieItem } from "./interface/movie";
import { movieListState } from "./store/movie";

const App = () => {
  const setMovieList = useSetRecoilState(movieListState);
  const [loading, setLoading] = useState("idle");

  useEffect(() => {
    setLoading("pending");
    axios
      .get(
        "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv"
      )
      .then((response: AxiosResponse<string>) => {
        const splitedDataByLine = response.data.split("\n");
        let movieArray = [] as MovieItem[];

        for (let index in splitedDataByLine) {
          if (index === "0") continue;

          const item = splitedDataByLine[index];
          const splitedByComma = item.split(",");

          movieArray = [
            ...movieArray,
            {
              id: index,
              name: splitedByComma[0],
              genre: splitedByComma[1],
              studio: splitedByComma[2],
              userRating: splitedByComma[3],
              profitability: splitedByComma[4],
              rottenRating: splitedByComma[5],
              gross: splitedByComma[6],
              release: splitedByComma[7],
            },
          ];
        }
        setMovieList(() => movieArray);
        setLoading("success");
      })
      .catch((error) => {
        setLoading("fail");
        console.error(error);
      });
  }, [setMovieList]);

  return (
    <BrowserRouter>
      <Layout />
      <main>
        {loading === "pending" ? (
          <div className="text-center">
            <CustomSpinner />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        )}
      </main>
    </BrowserRouter>
  );
};

export default App;
