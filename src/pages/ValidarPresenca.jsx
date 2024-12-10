import { useState, useEffect } from "react";
import LeitorQRCode from "../components/LeitorQRCode";
import { useNavigate } from "react-router-dom";

function ValidarPresenca() {
  const [presenca, setPresenca] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [statusPresenca, setStatusPresenca] = useState(""); // Status da presença
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [temPresenca, setTemPresenca] = useState(false); // Flag para verificar se há presença
  const userId = localStorage.getItem("userId");

  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  const dataHoje = `${ano}-${mes}-${dia}`;

  useEffect(() => {
    console.log(scanResult);
    if (scanResult) {
      async function buscarUsuario() {
        try {
          const response = await fetch(
            `https://callback-ivory.vercel.app/presenca/verificar/${scanResult}/${userId}`,
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
          console.log(data);
          setPresenca(data.presencaRetornada);

          // Verifica se há presença registrada para o dia
          const presencaHoje =
            data.presencaRetornada &&
            data.presencaRetornada.data ===
              new Date().toLocaleDateString("pt-BR");

          setTemPresenca(presencaHoje);

          setSuccess(
            presencaHoje ? "Presença carregada!" : "Presença registrada!"
          );
          setError("");
        } catch (error) {
          console.error("Erro na API:", error);
          setError(error.message);
        }
      }

      buscarUsuario();
    }
  }, [scanResult, userId]);
  const atualizarPresenca = async (newStatus) => {
    try {
      const response = await fetch(
        "https://callback-ivory.vercel.app/presenca/editar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_usuario: userId,
            id_onibus: scanResult,
            status_presenca: "PRESENTE",
            data: dataHoje,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || "Erro ao atualizar presença");
      }

      const data = await response.json();
      setPresenca(data.presencaAtualizada); // Atualiza o estado com os novos dados
      setTemPresenca(true);
      setStatusPresenca(newStatus);
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
          {/* Passa a função setScanResult como onScan para o LeitorQRCode */}
          <LeitorQRCode onScan={setScanResult} />
        </div>

        {/* Verifique se o 'usuario' existe antes de renderizar os dados */}
        {presenca && (
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-bold">Presenca encontrada:</h2>
            <p>Dia: {presenca.dia_semana}</p>
            <p>Status: {presenca.status}</p>

            {/* Se não tiver presença registrada para o dia, permite editar o status */}
            {!temPresenca ? (
              <>
                <div>
                  <label
                    htmlFor="statusPresenca"
                    className="block text-sm font-medium"
                  >
                    Status de Presença
                  </label>
                  <select
                    id="statusPresenca"
                    value={statusPresenca}
                    onChange={(e) => setStatusPresenca(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="so_vai">Só vai</option>
                    <option value="so_volta">Só Volta</option>
                    <option value="vai_volta">Vai e Volta</option>
                  </select>
                </div>

                {/* Botão para atualizar a presença */}
                <button
                  onClick={() => atualizarPresenca(statusPresenca)}
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

        {/* Exibe o erro se houver */}
        {error && (
          <p className="text-red-500 text-sm mt-2 font-bold text-center">
            {error}
          </p>
        )}

        {/* Exibe a mensagem de sucesso se houver */}
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
