import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList.jsx";
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getImageUrl
} from "../../services/tmdb.js";
import "./Home.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const populares = await getPopularMovies();
        const bemAvaliados = await getTopRatedMovies();
        const emCartaz = await getNowPlayingMovies();

        setPopularMovies(populares);
        setTopRatedMovies(bemAvaliados);
        setNowPlayingMovies(emCartaz);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarFilmes();
  }, []);

  if (loading) {
    return <p className="aviso">Carregando filmes...</p>;
  }

  if (erro) {
    return <p className="aviso aviso-erro">{erro}</p>;
  }

  const filmeDestaque = popularMovies[0];
  const backdropUrl = getImageUrl(filmeDestaque.backdrop_path, "original");

  return (
    <div className="home">
      <section
        className="destaque"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="destaque-conteudo">
          <p className="destaque-etiqueta">Em alta hoje</p>

          <h1 className="destaque-titulo">{filmeDestaque.title}</h1>

          <p className="destaque-descricao">{filmeDestaque.overview}</p>

          <Link to={`/filmes/${filmeDestaque.id}`} className="botao">
            Ver detalhes
          </Link>
        </div>
      </section>

      <div className="home-listas">
        <MovieList titulo="Filmes populares" movies={popularMovies} />
        <MovieList titulo="Mais bem avaliados" movies={topRatedMovies} />
        <MovieList titulo="Em cartaz nos cinemas" movies={nowPlayingMovies} />
      </div>
    </div>
  );
};

export default Home;
