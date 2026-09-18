import { Link } from "react-router-dom";

import { getImageUrl } from "../../services/tmdb.js";
import { useListas } from "../../context/ListasContext.jsx";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const { alternarCurtido, alternarVerDepois, estaCurtido, estaEmVerDepois } =
    useListas();

  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const nota = movie.vote_average ? movie.vote_average.toFixed(1) : "-";
  const curtido = estaCurtido(movie.id);
  const marcado = estaEmVerDepois(movie.id);

  const curtir = () => {
    alternarCurtido(movie);
  };

  const marcarParaVerDepois = () => {
    alternarVerDepois(movie);
  };

  return (
    <article className="movie-card">
      <div className="movie-card-poster">
        <Link to={`/filmes/${movie.id}`} className="movie-card-link">
          {posterUrl ? (
            <img src={posterUrl} alt={`Poster do filme ${movie.title}`} />
          ) : (
            <div className="movie-card-sem-poster">Sem imagem</div>
          )}

          <span className="movie-card-nota">{nota}</span>

          <div className="movie-card-sinopse">
            <p>
              {movie.overview
                ? movie.overview
                : "Este filme ainda nao tem sinopse em portugues."}
            </p>
          </div>
        </Link>

        <div className="movie-card-acoes">
          <button
            type="button"
            className={curtido ? "movie-card-acao ativa" : "movie-card-acao"}
            onClick={curtir}
            title={curtido ? "Remover dos curtidos" : "Curtir"}
            aria-label={curtido ? "Remover dos curtidos" : "Curtir"}
          >
            {curtido ? "♥" : "♡"}
          </button>

          <button
            type="button"
            className={marcado ? "movie-card-acao ativa" : "movie-card-acao"}
            onClick={marcarParaVerDepois}
            title={marcado ? "Remover de ver depois" : "Ver depois"}
            aria-label={marcado ? "Remover de ver depois" : "Ver depois"}
          >
            {marcado ? "✓" : "+"}
          </button>
        </div>
      </div>

      <h3 className="movie-card-titulo">
        <Link to={`/filmes/${movie.id}`}>{movie.title}</Link>
      </h3>
    </article>
  );
};

export default MovieCard;
