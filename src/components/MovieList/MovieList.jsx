import MovieCard from "../MovieCard/MovieCard.jsx";
import "./MovieList.css";

const MovieList = ({ titulo, movies }) => {
  return (
    <section className="movie-list">
      <h2 className="movie-list-titulo">{titulo}</h2>

      <div className="movie-list-fileira">
        {movies.map((movie) => (
          <div className="movie-list-item" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
