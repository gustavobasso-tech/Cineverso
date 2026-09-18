import { NavLink, Link } from "react-router-dom";

import { useListas } from "../../context/ListasContext.jsx";
import "./Header.css";

const Header = () => {
  const { curtidos, verDepois } = useListas();
  const totalSalvos = curtidos.length + verDepois.length;

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Cine<span>verso</span>
      </Link>

      <nav className="header-nav">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/filmes">Filmes</NavLink>
        <NavLink to="/minha-lista">
          Minha lista
          {totalSalvos > 0 && <span className="header-contador">{totalSalvos}</span>}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
