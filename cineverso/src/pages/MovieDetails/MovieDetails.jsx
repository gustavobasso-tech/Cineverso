import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMovieById, getImageUrl } from "../../services/tmdb.js";
import { useListas } from "../../context/ListasContext.jsx";
import "./MovieDetails.css";

const formatarData = (data) => {
  if (!data) {
    return "Data nao informada";
  }

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { alternarCurtido, alternarVerDepois, estaCurtido, estaEmVerDepois } =
    useListas();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarDetalhes = async () => {
      setLoading(true);
      setErro("");

      try {
        const filme = await getMovieById(id);

        setMovieDetails(filme);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDetalhes();
  }, [id]);

  const voltar = () => {
    navigate(-1);
  };

  if (loading) {
    return <p className="aviso">Carregando detalhes...</p>;
  }

  if (erro) {
    return <p className="aviso aviso-erro">{erro}</p>;
  }

  const posterUrl = getImageUrl(movieDetails.poster_path, "w500");
  const backdropUrl = getImageUrl(movieDetails.backdrop_path, "original");
  const curtido = estaCurtido(movieDetails.id);
  const marcado = estaEmVerDepois(movieDetails.id);

  return (
    <div className="detalhes">
      {backdropUrl && (
        <div
          className="detalhes-fundo"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      <div className="detalhes-conteudo">
        <button type="button" className="botao botao-secundario" onClick={voltar}>
          Voltar
        </button>

        <div className="detalhes-corpo">
          {posterUrl && (
            <img
              className="detalhes-poster"
              src={posterUrl}
              alt={`Poster do filme ${movieDetails.title}`}
            />
          )}

          <div className="detalhes-texto">
            <h1 className="detalhes-titulo">{movieDetails.title}</h1>

            <div className="detalhes-dados">
              <span className="detalhes-nota">
                {movieDetails.vote_average.toFixed(1)}
              </span>
              <span>{formatarData(movieDetails.release_date)}</span>
              {movieDetails.runtime > 0 && <span>{movieDetails.runtime} min</span>}
            </div>

            <div className="detalhes-generos">
              {movieDetails.genres.map((genero) => (
                <span className="detalhes-genero" key={genero.id}>
                  {genero.name}
                </span>
              ))}
            </div>

            <div className="detalhes-acoes">
              <button
                type="button"
                className={
                  curtido ? "botao detalhes-acao-ativa" : "botao botao-secundario"
                }
                onClick={() => alternarCurtido(movieDetails)}
              >
                {curtido ? "♥ Curtido" : "♡ Curtir"}
              </button>

              <button
                type="button"
                className={
                  marcado ? "botao detalhes-acao-ativa" : "botao botao-secundario"
                }
                onClick={() => alternarVerDepois(movieDetails)}
              >
                {marcado ? "✓ Na lista" : "+ Ver depois"}
              </button>
            </div>

            <h2 className="detalhes-subtitulo">Sinopse</h2>
            <p className="detalhes-sinopse">
              {movieDetails.overview
                ? movieDetails.overview
                : "Este filme ainda nao tem sinopse em portugues."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
