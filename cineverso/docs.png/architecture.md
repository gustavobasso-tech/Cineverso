# Arquitetura do Projeto - Cineverso

## 1. Páginas e Rotas
- `/`: Home (Filmes em destaque e populares)
- `/movies`: Lista/Busca de filmes
- `/movie/:id`: Detalhes do filme selecionado (Rota dinâmica)
- `/my-list`: Lista pessoal do usuário
- `*`: Página de erro 404 (NotFound)

## 2. Componentes Principais
- **Header:** Menu de navegação superior da aplicação.
- **MovieCard:** Cartão reutilizável com imagem de capa, título e nota do filme.
- **MovieList:** Grid responsivo para renderização de uma coleção de componentes MovieCard.

## 3. Props e Estados (React)
- **Props:**
  - `MovieCard`: Recebe o objeto `movie` (id, title, poster_path, vote_average).
- **Estados Local (`useState`):**
  - Lista de filmes carregados via API.
  - Estado de carregamento (*loading*) e mensagem de erro.
- **Efeitos (`useEffect`):**
  - Requisição assíncrona ao carregar as páginas para buscar dados da API do TMDb.

## 4. Gerenciamento de Estado Global
- **ListasContext (`src/context/ListasContext.jsx`):** Context API responsável por armazenar a lista pessoal de filmes salvos pelo usuário e disponibilizar funções de adicionar/remover itens.