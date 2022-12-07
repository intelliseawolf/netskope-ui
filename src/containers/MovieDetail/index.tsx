import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { movieListState } from "../../store/movie";
import type { MovieItem } from "../../interface/movie";

const MovieDetail = () => {
  const [movie, setMovie] = useState<MovieItem | null>(null);
  const [movieList] = useRecoilState(movieListState);
  const { id } = useParams();

  useEffect(() => {
    const movieIndex = movieList.findIndex((item) => item.id === id);
    setMovie(movieList[movieIndex]);
  }, [id, movieList]);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h1 className="">{movie?.name}</h1>
        <Link to="/">
          <Button variant="primary">Back</Button>
        </Link>
      </div>
      <hr className="py-3" />
      <div>
        <strong>Genre: </strong>
        {movie?.genre}
      </div>
      <div>
        <strong>Studio: </strong>
        {movie?.studio}
      </div>
      <div>
        <strong>User Rating: </strong>
        {movie?.userRating}%
      </div>
      <div>
        <strong>Profitability: </strong>
        {Math.round(Number(movie?.profitability) * 10) / 10}%
      </div>
      <div>
        <strong>Rotten Tomatoes Rating: </strong>
        {movie?.rottenRating}
      </div>
      <div>
        <strong>Worldwide Gross: </strong>
        {movie?.gross}m
      </div>
      <div>
        <strong>Year Release: </strong>
        {movie?.release}
      </div>
    </Container>
  );
};

export default MovieDetail;
