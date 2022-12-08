import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Container from "react-bootstrap/Container";

import { movieListState } from "../../store/movie";

const Home = () => {
  const [movieList] = useRecoilState(movieListState);

  return (
    <Container>
      <h1 className="text-center">Movie list</h1>
      <hr className="py-3" />
      {movieList.map((movie) => (
        <Link to={`movie/${movie.id}`} key={movie.id}>
          {movie.name}
          <br />
        </Link>
      ))}
    </Container>
  );
};

export default Home;
