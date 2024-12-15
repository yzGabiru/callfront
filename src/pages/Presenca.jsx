import PropTypes from "prop-types";
import { useEffect } from "react";

function Presenca({ presencas, buscarPresencas }) {
  useEffect(() => {
    buscarPresencas();

    const interval = setInterval(() => {
      buscarPresencas();
    }, 5000);

    return () => clearInterval(interval);
  }, [buscarPresencas]);

  // Função para verificar se a data é igual ou posterior à data atual
  const filtrarPresencasValidas = (presencas) => {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    const dataHoje = `${dia}-${mes}-${ano}`;

    return presencas.filter((presenca) => {
      const dataPresenca = presenca.data;
      return dataPresenca >= dataHoje;
    });
  };

  const presencasValidas = filtrarPresencasValidas(presencas);

  return (
    <div className="space-y-4 bg-slate-100 p-4 rounded-md shadow">
      <h2 className="text-xl font-bold text-slate-700">Presenças</h2>
      {presencasValidas.length === 0 ? (
        <p className="text-slate-500">
          Nenhuma presença futura registrada ainda.
        </p>
      ) : (
        <ul className="space-y-2">
          {presencasValidas.map((presenca, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-slate-200 p-3 rounded-md"
            >
              <span>
                <strong>Data:</strong> {presenca.data}
              </span>
              <span
                className={`p-1 rounded text-white ${
                  presenca.vai ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <strong>Vai:</strong> {presenca.vai ? "Sim" : "Não"}
              </span>
              <span
                className={`p-1 rounded text-white ${
                  presenca.volta ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <strong>Volta:</strong> {presenca.volta ? "Sim" : "Não"}
              </span>
              <button className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">
                Editar
              </button>
              <button className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Presenca.propTypes = {
  presencas: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.string.isRequired, // A data deve estar em um formato válido como 'YYYY-MM-DD'
      vai: PropTypes.bool.isRequired,
      volta: PropTypes.bool.isRequired,
    })
  ),
  buscarPresencas: PropTypes.func,
};

export default Presenca;
