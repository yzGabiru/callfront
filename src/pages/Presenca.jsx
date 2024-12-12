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

  return (
    <div className="space-y-4 bg-slate-100 p-4 rounded-md shadow">
      <h2 className="text-xl font-bold text-slate-700">Presenças</h2>
      {presencas.length === 0 ? (
        <p className="text-slate-500">Nenhuma presença registrada ainda.</p>
      ) : (
        <ul className="space-y-2">
          {presencas.map((presenca, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-slate-200 p-3 rounded-md"
            >
              <span>
                <strong>Data:</strong> {presenca.data}
              </span>
              <span>
                <strong>Vai:</strong> {presenca.vai ? "Sim" : "Não"}
              </span>
              <span>
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
      data: PropTypes.string.isRequired,
      vai: PropTypes.bool.isRequired,
      volta: PropTypes.bool.isRequired,
    })
  ),
  buscarPresencas: PropTypes.func,
};

export default Presenca;
