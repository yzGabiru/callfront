import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BuscarOnibus({
  onibus,
  contexto = "default" /*, clickDeletarOnibus*/,
}) {
  const navigate = useNavigate();

  function verChamadaClick(onibus) {
    const query = new URLSearchParams();
    query.set("onibus", onibus.id_onibus);
    navigate(`/presenca/cadastro?${query.toString()}`);
  }

  function retornaDetalhes(onibus) {
    const query = new URLSearchParams();
    query.set("nome", onibus.nome_onibus);
    query.set("descricao", onibus.descricao);
    navigate(`/onibus/buscar?${query.toString()}`);
  }
  function verPresencaClick(onibus) {
    const query = new URLSearchParams();
    query.set("onibus", onibus.id_onibus);
    navigate(`/admin?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {onibus.map((bus) => (
        <li key={bus.id_onibus} className="flex gap-2">
          <button
            className="bg-slate-400 text-white p-2 rounded-md w-full text-left"
            onClick={() => retornaDetalhes(bus)}
          >
            {bus.nome_onibus}
          </button>

          {/* Botão "Chamada" */}
          {contexto === "default" && (
            <button
              onClick={() => verChamadaClick(bus)}
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              Chamada
            </button>
          )}

          {/* Botão "Validar Presença" */}
          {contexto === "default" && (
            <button
              className="bg-slate-400 p-2 rounded-md text-white"
              onClick={() => navigate("/presenca/validar")}
            >
              Validar Presença
            </button>
          )}

          {/* Botão "Gerenciar" */}
          {contexto === "admin" && (
            <button
              className="bg-blue-500 p-2 rounded-md text-white"
              onClick={() => verPresencaClick(bus)}
            >
              Gerenciar
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

BuscarOnibus.propTypes = {
  onibus: PropTypes.array.isRequired,
  contexto: PropTypes.string, // "default" ou "admin"
  clickDeletarOnibus: PropTypes.func,
};

export default BuscarOnibus;
