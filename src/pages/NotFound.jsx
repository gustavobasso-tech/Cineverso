import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="aviso">
      <h1>Pagina nao encontrada</h1>
      <p>O endereco que voce tentou abrir nao existe no Cineverso.</p>
      <Link to="/" className="botao">
        Ir para o inicio
      </Link>
    </div>
  );
};

export default NotFound;
