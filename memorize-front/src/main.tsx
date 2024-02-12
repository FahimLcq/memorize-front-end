import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.tsx";
import Decks from "./components/Decks/index.tsx";
import Home from "./components/Home/index.tsx";
import Cards from "./components/Cards/index.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import Error from "./components/Error/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: < Error />,

    children: [
      {index: true, element: <Home />},
      {path: "/decks/:id", element: <Cards />},
      {path: "/decks", element: <Decks />},
    ]

  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
