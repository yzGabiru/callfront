import { useState } from "react";
import LeitorQRCode from "../components/LeitorQRCode";
import { useNavigate } from "react-router-dom";

function ValidarPresenca() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const dataHoje = `${ano}-${mes}-${dia}`;

  const API_URL = import.meta.env.VITE_API_URL;

  const atualizarPresenca = async (scanResult) => {
    try {
      const response = await fetch(`${API_URL}/presenca/editar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: userId,
          id_onibus: scanResult,
          data: dataHoje,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || "Erro ao atualizar presença");
      }

      setSuccess("Presença registrada com sucesso!");
      setError("");
    } catch (error) {
      console.error("Erro na API:", error);
      setError(error.message);
      setSuccess("");
    }
  };

  const handleScanResult = (scanResult) => {
    if (scanResult) {
      atualizarPresenca(scanResult);
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
          <LeitorQRCode onScan={handleScanResult} />
        </div>

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
