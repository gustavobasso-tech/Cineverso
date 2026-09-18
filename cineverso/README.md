# Cineverso

Site de filmes inspirado em servicos de streaming, feito com React + Vite e a API do TMDB.

## Como rodar

```bash
npm install
npm run dev
```

O arquivo `.env` na raiz precisa ter o token do TMDB:

```env
VITE_TMDB_TOKEN=seu_token_aqui
```

O Vite so entrega ao navegador as variaveis que comecam com `VITE_`. Em
`src/services/tmdb.js` ela e lida com `import.meta.env.VITE_TMDB_TOKEN` e enviada
no cabecalho `Authorization` de cada requisicao. O `.env` esta no `.gitignore`.

## Estrutura

```text
src/
├── components/
│   ├── Header/        -> cabecalho, navegacao e contador da minha lista
│   ├── MovieCard/     -> card do filme (cresce e mostra a sinopse no hover)
│   └── MovieList/     -> fileira horizontal de cards
│
├── context/
│   └── ListasContext.jsx  -> filmes curtidos e marcados para ver depois
│
├── pages/
│   ├── Home/          -> destaque + fileiras de filmes
│   ├── Movies/        -> busca por nome + grade de filmes
│   ├── MovieDetails/  -> detalhes de um filme (/filmes/:id)
│   ├── MyList/        -> curtidos e para ver depois
│   └── NotFound.jsx   -> pagina 404
│
├── services/
│   └── tmdb.js        -> todas as chamadas a API do TMDB
│
├── routes/
│   └── router.jsx     -> rotas (createBrowserRouter)
│
├── App.jsx            -> layout: Header + <Outlet /> + rodape
├── main.jsx           -> ponto de entrada (ListasProvider + RouterProvider)
└── index.css          -> estilos globais e variaveis de cor
```

## Rotas

| URL             | Pagina       |
| --------------- | ------------ |
| `/`             | Home         |
| `/filmes`       | Movies       |
| `/filmes/:id`   | MovieDetails |
| `/minha-lista`  | MyList       |

## Funcoes do servico TMDB

| Funcao                 | Endpoint            | Devolve            |
| ---------------------- | ------------------- | ------------------ |
| `getPopularMovies`     | `/movie/popular`    | lista de filmes    |
| `getTopRatedMovies`    | `/movie/top_rated`  | lista de filmes    |
| `getNowPlayingMovies`  | `/movie/now_playing`| lista de filmes    |
| `searchMovies`         | `/search/movie`     | lista de filmes    |
| `getMovieById`         | `/movie/{id}`       | um filme           |
| `getImageUrl`          | -                   | url da imagem      |

## Curtir e ver depois

O `ListasContext` guarda dois arrays: `curtidos` e `verDepois`. Ele fica no
`main.jsx`, envolvendo o site inteiro, entao qualquer componente le e altera as
listas com `useListas()`. Toda vez que uma lista muda, um `useEffect` salva no
`localStorage` do navegador, por isso os filmes continuam la depois de recarregar
a pagina.

## Fluxo dos dados

```text
Componente (ex: Movies)
   ↓ chama
funcao do service (ex: searchMovies)
   ↓ faz
fetch
   ↓ para
TMDB
   ↓ devolve
dados (JSON)
   ↓ salvos com useState
componente renderiza
```
