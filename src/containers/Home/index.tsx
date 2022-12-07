import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Container from "react-bootstrap/Container";
import axios, { AxiosResponse } from "axios";

import { movieListState } from "../../store/movie";
import { MovieItem } from "../../interface/movie";

const Home = () => {
  const [movieList, setMovieList] = useRecoilState(movieListState);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv"
      )
      .then((response: AxiosResponse<string>) => {
        const splitedDataByLine = response.data.split("\n");
        let movieArray = [] as MovieItem[];

        for (let index in splitedDataByLine) {
          const item = splitedDataByLine[index];
          const splitedByComma = item.split(",");

          movieArray = [
            ...movieArray,
            {
              id: Number(index),
              name: splitedByComma[0],
              genre: splitedByComma[1],
              userRating: splitedByComma[2],
              profitability: splitedByComma[3],
              gross: splitedByComma[4],
              rottenRating: splitedByComma[5],
              release: splitedByComma[6],
            },
          ];
        }
        setMovieList(movieArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setMovieList]);

  return (
    <Container>
      <h1 className="text-center">Movie list</h1>
      <hr className="py-3" />
      {movieList.map((movie) => (
        <Link to="" key={movie.id}>
          {movie.name}
          <br />
        </Link>
      ))}
    </Container>
  );
};

export default Home;
