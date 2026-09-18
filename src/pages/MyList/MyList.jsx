import { Link } from "react-router-dom";

import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import { useListas } from "../../context/ListasContext.jsx";
import "./MyList.css";

const MyList = () => {
  const { curtidos, verDepois } = useListas();
  const listaVazia = curtidos.length === 0 && verDepois.length === 0;

  if (listaVazia) {
    return (
      <div className="aviso">
        <h1>Sua lista esta vazia</h1>
        <p>
          Passe o mouse em um filme e use o coracao para curtir ou o + para ver
          depois.
        </p>
        <Link to="/filmes" className="botao">
          Procurar filmes
        </Link>
      </div>
    );
  }

  return (
    <div className="minha-lista">
      <h1 className="minha-lista-titulo">Minha lista</h1>

      {curtidos.length > 0 && (
        <section className="minha-lista-secao">
          <h2>Filmes que eu curti</h2>

          <div className="minha-lista-grade">
            {curtidos.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>
      )}

      {verDepois.length > 0 && (
        <section className="minha-lista-secao">
          <h2>Para ver depois</h2>

          <div className="minha-lista-grade">
            {verDepois.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyList;
