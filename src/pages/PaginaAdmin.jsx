import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ChamadaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [presencas, setPresencas] = useState([]);
  const [view, setView] = useState("going");
  const token = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  //o aluno que vai e volta ta dando como presente na volta tambem mesmo estando na ida

  // Função para buscar alunos
  const fetchAlunos = async () => {
    try {
      const response = await fetch(`${API_URL}/usuario/pegarTodos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAlunos(data.alunos || []);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  // Função para buscar presenças
  const fetchPresencas = async () => {
    try {
      const response = await fetch(`${API_URL}/presenca/buscar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPresencas(data.presencas || []);
    } catch (error) {
      console.error("Erro ao buscar presenças:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
    fetchPresencas();

    const interval = setInterval(() => {
      fetchPresencas();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL, token]);

  const mudarStatusPresenca = (id_usuario) => {
    setPresencas((prevPresencas) => {
      return prevPresencas.map((presenca) => {
        if (presenca.id_usuario === id_usuario) {
          return { ...presenca, status_presenca: !presenca.status_presenca };
        }
        return presenca;
      });
    });
  };

  const alunosComPresenca = alunos.map((aluno) => {
    const presenca = presencas.find((p) => p.id_usuario === aluno.id_usuario);
    return {
      ...aluno,
      presente: presenca ? presenca.status_presenca : false, // Definir presença com base no status_presenca
      vai: presenca ? presenca.vai : false, // Status de "vai"
      volta: presenca ? presenca.volta : false, // Status de "volta"
    };
  });

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 bg-slate-400 p-2 rounded-md text-white"
          >
            Voltar
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center p-3">
            Chamada de Alunos
          </h1>
        </div>

        <div className="flex justify-center mb-4">
          <select
            className="border rounded px-4 py-2 bg-white"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <option value="going">Alunos que vão</option>
            <option value="returning">Alunos que voltam</option>
          </select>
        </div>
        <ul className="space-y-4">
          {alunosComPresenca
            .filter(
              (aluno) =>
                view === "going"
                  ? aluno.vai // Filtra para mostrar os alunos que vão
                  : aluno.volta // Filtra para mostrar os alunos que voltam
            )
            .map((aluno) => (
              <li
                key={aluno.id_usuario}
                className={`flex justify-between items-center p-4 rounded shadow ${
                  aluno.presente ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span className="text-lg text-black">{aluno.nome}</span>
                <div className="flex space-x-2">
                  {/* Quadradinho para 'vai' */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      aluno.vai ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  {/* Quadradinho para 'volta' */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      aluno.volta ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <button
                  className={`px-4 py-2 rounded text-white ${
                    aluno.presente ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => mudarStatusPresenca(aluno.id_usuario)}
                >
                  {aluno.presente ? "Presente" : "Ausente"}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

ChamadaAlunos.propTypes = {
  alunos: PropTypes.arrayOf(
    PropTypes.shape({
      id_usuario: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      presente: PropTypes.bool,
      tipo: PropTypes.string,
    })
  ),
  presencas: PropTypes.arrayOf(
    PropTypes.shape({
      id_usuario: PropTypes.string.isRequired,
      status_presenca: PropTypes.bool,
      status: PropTypes.string,
    })
  ),
  view: PropTypes.string,
  togglePresenca: PropTypes.func,
  navigate: PropTypes.func,
};

export default ChamadaAlunos;
