import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtegerRotas = ({ children }) => {
  const token = localStorage.getItem("authToken");

  //verificar se o token é valido

  if (!token) {
    // Se não houver token, redireciona para o login
    return <Navigate to="/usuario/login" replace />;
  }

  // Caso contrário, renderiza o conteúdo da rota protegida
  return children;
};

ProtegerRotas.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtegerRotas;
