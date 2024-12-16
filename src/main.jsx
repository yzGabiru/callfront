import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Onibus from "./pages/Onibus.jsx";
import DetalhesOnibus from "./components/DetalhesOnibus.jsx";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import CadastroPresenca from "./pages/CadastroPresenca.jsx";
import Presenca from "./pages/Presenca.jsx";
import ValidarPresenca from "./pages/ValidarPresenca.jsx";
import ProtegerRotas from "./components/ProtegerRotas.jsx";
import PaginaAdmin from "./pages/PaginaAdmin.jsx";
import OnibusAdmin from "./pages/OnibusAdmin.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/onibus",
    element: (
      <ProtegerRotas>
        <Onibus />
      </ProtegerRotas>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtegerRotas>
        <OnibusAdmin />
      </ProtegerRotas>
    ),
  },
  {
    path: "/onibus/buscar",
    element: (
      <ProtegerRotas>
        <DetalhesOnibus />
      </ProtegerRotas>
    ),
  },
  {
    path: "/usuario/cadastro",
    element: <CadastroUsuario />, // Rota pública
  },
  {
    path: "/usuario/login",
    element: <Login />, // Rota pública
  },
  {
    path: "/presenca/cadastro",
    element: (
      <ProtegerRotas>
        <CadastroPresenca />
      </ProtegerRotas>
    ),
  },
  {
    path: "/presenca/buscar",
    element: (
      <ProtegerRotas>
        <Presenca />
      </ProtegerRotas>
    ),
  },
  {
    path: "/presenca/validar",
    element: (
      <ProtegerRotas>
        <ValidarPresenca />
      </ProtegerRotas>
    ),
  },
  {
    path: "/admin/onibus",
    element: (
      <ProtegerRotas>
        <PaginaAdmin />,
      </ProtegerRotas>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
