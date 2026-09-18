import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="rodape">
        <p>Cineverso - trabalho de webDev :)</p>
      </footer>
    </div>
  );
};

export default App;
