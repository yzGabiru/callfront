import { useState, useEffect } from "react";
import LeitorQRCode from "../components/LeitorQRCode";
import { useNavigate } from "react-router-dom";

function ValidarPresenca() {
  const [presenca, setPresenca] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [vai, setVai] = useState(false); // Estado para "vai"
  const [volta, setVolta] = useState(false); // Estado para "volta"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [temPresenca, setTemPresenca] = useState(false); // Flag para verificar se há presença
  const userId = localStorage.getItem("userId");

  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  const dataHoje = `${ano}-${mes}-${dia}`;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (scanResult) {
      async function buscarUsuario() {
        try {
          const response = await fetch(
            `${API_URL}/presenca/verificar/${scanResult}/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || "Erro desconhecido");
          }
          const data = await response.json();
          console.log("dados verificar presenca: ", data);
          setPresenca(data.presencaRetornada);

          const presencaHoje =
            data.presencaRetornada &&
            data.presencaRetornada.data ===
              new Date().toLocaleDateString("pt-BR");

          setTemPresenca(presencaHoje);

          if (presencaHoje) {
            setVai(data.presencaRetornada.vai);
            setVolta(data.presencaRetornada.volta);
            setSuccess("Presença carregada!");
          } else {
            setSuccess("Presença registrada!");
          }

          setError("");
        } catch (error) {
          console.error("Erro na API:", error);
          setError(error.message);
        }
      }

      buscarUsuario();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanResult, userId]);

  //mudar esse campo de atualizar presença para o cadastrar presença, aqui ficar só um botao de presença verificada
  const atualizarPresenca = async () => {
    try {
      const response = await fetch(`${API_URL}/presenca/editar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: userId,
          id_onibus: scanResult,
          vai,
          volta,
          data: dataHoje,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || "Erro ao atualizar presença");
      }

      const data = await response.json();
      setPresenca(data.presencaAtualizada); // Atualiza o estado com os novos dados
      setTemPresenca(true);
      setSuccess("Presença atualizada com sucesso!");
      setError("");
    } catch (error) {
      console.error("Erro na API:", error);
      setError(error.message);
    }
  };

  const navigate = useNavigate();

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
          <h1 className="text-3xl text-slate-950 font-bold text-center p-1">
            Leitor de QR-Code
          </h1>
        </div>
        <div className="flex justify-center relative mb-6">
          <LeitorQRCode onScan={setScanResult} />
        </div>

        {presenca && (
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-bold">Presença encontrada:</h2>
            <p>Dia: {presenca.dia_semana}</p>

            {!temPresenca ? (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium">Vai</label>
                  <input
                    type="checkbox"
                    checked={vai}
                    onChange={(e) => setVai(e.target.checked)}
                    className="mt-1"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium">Volta</label>
                  <input
                    type="checkbox"
                    checked={volta}
                    onChange={(e) => setVolta(e.target.checked)}
                    className="mt-1"
                  />
                </div>

                <button
                  onClick={atualizarPresenca}
                  className="mt-4 bg-blue-500 text-white p-2 rounded-md"
                >
                  Atualizar Presença
                </button>
              </>
            ) : (
              <p className="text-green-500 text-sm mt-2 font-bold">
                Presença Atualizada!
              </p>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-2 font-bold text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-sm mt-2 font-bold text-center">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}

export default ValidarPresenca;
