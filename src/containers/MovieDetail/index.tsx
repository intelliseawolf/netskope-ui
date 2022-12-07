import { useState, useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import CommentForm from "../../components/CommentForm";

import { movieListState } from "../../store/movie";
import { commentListState } from "../../store/comment";
import type { MovieItem } from "../../interface/movie";
import type { CommentFormData } from "../../components/CommentForm";

const MovieDetail = () => {
  const [movie, setMovie] = useState<MovieItem | null>(null);
  const [movieList] = useRecoilState(movieListState);
  const [commentList, setCommentList] = useRecoilState(commentListState);
  const { id } = useParams();
  const movieComments = useMemo(() => {
    const index = commentList.findIndex((comment) => comment.movieId === id);

    if (index === -1) {
      return [];
    } else {
      return commentList[index].comments;
    }
  }, [commentList, id]);

  useEffect(() => {
    const movieIndex = movieList.findIndex((item) => item.id === id);
    setMovie(movieList[movieIndex]);
  }, [id, movieList]);

  function addComment(data: CommentFormData) {
    if (!id) return;

    const index = commentList.findIndex((comment) => comment.movieId === id);
    const newArray = [...commentList];

    if (index !== -1) {
      newArray[index] = {
        movieId: id,
        comments: [
          ...commentList[index].comments,
          {
            name: data.name,
            comment: data.comment,
          },
        ],
      };
      setCommentList(newArray);
    } else {
      setCommentList([
        ...commentList,
        {
          movieId: id,
          comments: [{ name: data.name, comment: data.comment }],
        },
      ]);
    }
  }

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h1 className="">{movie?.name}</h1>
        <Link to="/">
          <Button variant="primary">Back</Button>
        </Link>
      </div>
      <hr className="py-3" />
      <Row>
        <Col md="6">
          <section>
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
          </section>
          <hr className="py-2" />
          <section>
            <h3 className="">Comments</h3>
            {movieComments.map((comment) => (
              <div>
                <strong>{comment?.name}: </strong>
                {comment?.comment}
              </div>
            ))}
            <CommentForm submitForm={addComment} />
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
