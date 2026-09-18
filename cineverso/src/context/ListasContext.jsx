import { createContext, useContext, useEffect, useState } from "react";

const ListasContext = createContext(null);

const lerListaSalva = (chave) => {
  const salvo = localStorage.getItem(chave);

  if (!salvo) {
    return [];
  }

  return JSON.parse(salvo);
};

export const ListasProvider = ({ children }) => {
  const [curtidos, setCurtidos] = useState(() => lerListaSalva("curtidos"));
  const [verDepois, setVerDepois] = useState(() => lerListaSalva("verDepois"));

  useEffect(() => {
    localStorage.setItem("curtidos", JSON.stringify(curtidos));
  }, [curtidos]);

  useEffect(() => {
    localStorage.setItem("verDepois", JSON.stringify(verDepois));
  }, [verDepois]);

  const guardarSoODoNecessario = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average
    };
  };

  const alternarCurtido = (movie) => {
    const jaEstaNaLista = curtidos.some((filme) => filme.id === movie.id);

    if (jaEstaNaLista) {
      setCurtidos(curtidos.filter((filme) => filme.id !== movie.id));
    } else {
      setCurtidos([...curtidos, guardarSoODoNecessario(movie)]);
    }
  };

  const alternarVerDepois = (movie) => {
    const jaEstaNaLista = verDepois.some((filme) => filme.id === movie.id);

    if (jaEstaNaLista) {
      setVerDepois(verDepois.filter((filme) => filme.id !== movie.id));
    } else {
      setVerDepois([...verDepois, guardarSoODoNecessario(movie)]);
    }
  };

  const estaCurtido = (id) => {
    return curtidos.some((filme) => filme.id === id);
  };

  const estaEmVerDepois = (id) => {
    return verDepois.some((filme) => filme.id === id);
  };

  const valor = {
    curtidos,
    verDepois,
    alternarCurtido,
    alternarVerDepois,
    estaCurtido,
    estaEmVerDepois
  };

  return (
    <ListasContext.Provider value={valor}>{children}</ListasContext.Provider>
  );
};

export const useListas = () => {
  return useContext(ListasContext);
};
