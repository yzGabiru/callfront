import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BuscarOnibus(props) {
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

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {props.onibus.map((bus) => (
        <li key={bus.id_onibus} className="flex gap-2">
          <button
            className="bg-slate-400 text-white p-2 rounded-md w-full text-left"
            onClick={() => {
              retornaDetalhes(bus);
            }}
          >
            {bus.nome_onibus}
          </button>
          <button
            onClick={() => verChamadaClick(bus)}
            className="bg-slate-400 p-2 rounded-md text-white"
          >
            Chamada
          </button>
          <button
            className="bg-slate-400 p-2 rounded-md text-white"
            onClick={() => {
              // props.clickDeletarOnibus(bus.id_onibus);
              navigate("/presenca/validar");
            }}
          >
            Validar Presença
          </button>
        </li>
      ))}
    </ul>
  );
}

BuscarOnibus.propTypes = {
  onibus: PropTypes.array,
  clickDeletarOnibus: PropTypes.func,
};

export default BuscarOnibus;
