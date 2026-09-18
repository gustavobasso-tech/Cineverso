const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  accept: "application/json"
};

export const getImageUrl = (path, size = "w500") => {
  if (!path) {
    return null;
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getPopularMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/popular?language=pt-BR&page=${page}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os filmes populares.");
  }

  const data = await response.json();

  return data.results;
};

export const getTopRatedMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/top_rated?language=pt-BR&page=${page}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os filmes mais bem avaliados.");
  }

  const data = await response.json();

  return data.results;
};

export const getNowPlayingMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/now_playing?language=pt-BR&page=${page}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os filmes em cartaz.");
  }

  const data = await response.json();

  return data.results;
};

export const searchMovies = async (termo, page = 1) => {
  const termoNaUrl = encodeURIComponent(termo);
  const url = `${BASE_URL}/search/movie?query=${termoNaUrl}&language=pt-BR&page=${page}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Nao foi possivel buscar os filmes.");
  }

  const data = await response.json();

  return data.results;
};

export const getMovieById = async (id) => {
  const url = `${BASE_URL}/movie/${id}?language=pt-BR`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os detalhes deste filme.");
  }

  const movie = await response.json();

  return movie;
};
