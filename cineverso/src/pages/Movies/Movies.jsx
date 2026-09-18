import { useEffect, useState } from "react";

import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import { getPopularMovies, searchMovies } from "../../services/tmdb.js";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [textoDaBusca, setTextoDaBusca] = useState("");
  const [termoBuscado, setTermoBuscado] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarFilmes = async () => {
      setLoading(true);
      setErro("");

      try {
        let novosFilmes = [];

        if (termoBuscado === "") {
          novosFilmes = await getPopularMovies(page);
        } else {
          novosFilmes = await searchMovies(termoBuscado, page);
        }

        if (page === 1) {
          setMovies(novosFilmes);
        } else {
          setMovies((filmesAtuais) => [...filmesAtuais, ...novosFilmes]);
        }
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarFilmes();
  }, [page, termoBuscado]);

  const buscar = (evento) => {
    evento.preventDefault();
    setPage(1);
    setTermoBuscado(textoDaBusca.trim());
  };

  const limparBusca = () => {
    setPage(1);
    setTextoDaBusca("");
    setTermoBuscado("");
  };

  const verMaisFilmes = () => {
    setPage(page + 1);
  };

  const encontrouFilmes = movies.length > 0;

  return (
    <div className="movies">
      <h1 className="movies-titulo">Filmes</h1>
      <p className="movies-subtitulo">
        {termoBuscado === ""
          ? "Os filmes mais vistos do momento, direto do catalogo do TMDB."
          : `Resultados para "${termoBuscado}".`}
      </p>

      <form className="movies-busca" onSubmit={buscar}>
        <input
          type="text"
          className="movies-busca-campo"
          placeholder="Pesquisar filme pelo nome"
          value={textoDaBusca}
          onChange={(evento) => setTextoDaBusca(evento.target.value)}
        />

        <button type="submit" className="botao">
          Pesquisar
        </button>

        {termoBuscado !== "" && (
          <button
            type="button"
            className="botao botao-secundario"
            onClick={limparBusca}
          >
            Limpar
          </button>
        )}
      </form>

      {erro && <p className="aviso aviso-erro">{erro}</p>}

      {!erro && encontrouFilmes && (
        <div className="movies-grade">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      {!erro && !encontrouFilmes && !loading && (
        <p className="aviso">
          Nenhum filme encontrado com esse nome. Tente outra palavra.
        </p>
      )}

      {loading && <p className="aviso">Carregando filmes...</p>}

      {!loading && !erro && encontrouFilmes && (
        <button
          type="button"
          className="botao botao-secundario movies-ver-mais"
          onClick={verMaisFilmes}
        >
          Ver mais filmes
        </button>
      )}
    </div>
  );
};

export default Movies;
