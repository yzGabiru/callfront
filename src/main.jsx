import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Onibus from "./pages/Onibus.jsx";
import DetalhesOnibus from "./components/DetalhesOnibus.jsx";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import CadastroPresenca from "./pages/CadastroPresenca.jsx";
import Presenca from "./pages/Presenca.jsx";
import ValidarPresenca from "./pages/ValidarPresenca.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/onibus",
    element: <Onibus />,
  },
  {
    path: "/onibus/buscar",
    element: <DetalhesOnibus />,
  },
  {
    path: "/usuario/cadastro",
    element: <CadastroUsuario />,
  },
  {
    path: "/usuario/login",
    element: <Login />,
  },
  {
    path: "/presenca/cadastro",
    element: <CadastroPresenca />,
  },
  {
    path: "/presenca/buscar",
    element: <Presenca />,
  },
  {
    path: "/presenca/validar",
    element: <ValidarPresenca />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
