import PropTypes from "prop-types";

function BuscarPresencas({ presencas, usuarios }) {
  if (!Array.isArray(presencas)) {
    return <p>Erro: Dados de presença inválidos.</p>;
  }

  // Função para buscar o nome do usuário pelo id_usuario
  const obterNomeUsuario = (id_usuario) => {
    const usuario = usuarios.find(
      (usuario) => usuario.id_usuario === id_usuario
    );
    return usuario ? usuario.nome : "Usuário desconhecido";
  };

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {presencas.map((presenca) => (
        <li key={presenca.id_presenca} className="flex gap-2">
          <button className="bg-slate-400 text-white p-2 rounded-md w-full text-left">
            {obterNomeUsuario(presenca.id_usuario)}
          </button>
          <button className="bg-slate-400 p-2 rounded-md text-white">
            Deletar Presença
          </button>
        </li>
      ))}
    </ul>
  );
}

BuscarPresencas.propTypes = {
  presencas: PropTypes.array,
  usuarios: PropTypes.array,
};

export default BuscarPresencas;
