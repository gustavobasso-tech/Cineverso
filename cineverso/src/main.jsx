import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/router.jsx";
import { ListasProvider } from "./context/ListasContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListasProvider>
      <RouterProvider router={router} />
    </ListasProvider>
  </React.StrictMode>
);
