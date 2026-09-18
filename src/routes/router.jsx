import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";
import Movies from "../pages/Movies/Movies.jsx";
import MovieDetails from "../pages/MovieDetails/MovieDetails.jsx";
import MyList from "../pages/MyList/MyList.jsx";
import NotFound from "../pages/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "filmes",
        element: <Movies />
      },
      {
        path: "filmes/:id",
        element: <MovieDetails />
      },
      {
        path: "minha-lista",
        element: <MyList />
      }
    ]
  }
]);
