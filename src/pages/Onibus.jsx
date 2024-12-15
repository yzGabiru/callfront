/* eslint-disable no-unused-vars */
import RegistrarOnibus from "../components/RegistrarOnibus";
import BuscarOnibus from "../components/BuscarOnibus";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
// import DetalhesOnibus from "../components/DetalhesOnibus";

function Onibus() {
  const [onibus, setOnibus] = useState([]);

  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");

  const API_URL = import.meta.env.VITE_API_URL;
  //funcao deletar onibus
  async function clickDeletarOnibus(onibusId) {
    const novosOnibus = onibus.filter(
      (onibus) => onibus.id_onibus !== onibusId
    );

    // Faz a chamada para a API
    try {
      const response = await fetch(`${API_URL}/onibus/deletar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_onibus: onibusId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar ônibus");
      }

      setOnibus(novosOnibus);

      const data = await response.json();
      console.log("deleção bem-sucedido:", data);
    } catch (error) {
      console.error("Erro na API:", error);
      setOnibus([...onibus, onibus.find((bus) => bus.id_onibus === onibusId)]);
    }
  }

  //funcao adicionar onibus

  async function clickAdicionarOnibus(nome, descricao) {
    const novoOnibus = {
      id_onibus: v4(),
      nome_onibus: nome,
      descricao: descricao,
    };
    // Atualiza localmente
    setOnibus([...onibus, novoOnibus]);

    // Faz a chamada para a API
    try {
      const response = await fetch(
        "https://callback-ivory.vercel.app/onibus/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(novoOnibus),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erro desconhecido");
      }

      const data = await response.json();
      setError("");
    } catch (error) {
      console.error("Erro na API:", error);
      setError(error.message);
    }
  }

  //rota para buscar todos os onibus
  useEffect(() => {
    async function buscarOnibus() {
      //chamar a api
      const response = await fetch(
        "https://callback-ivory.vercel.app/onibus/buscar",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      //pegar os dados
      setOnibus(data.onibus);
    }
    buscarOnibus();
  }, []);
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
          <h1 className="text-3xl text-slate-100 font-bold text-center p-3">
            Ônibus
          </h1>
        </div>
        {/* <DetalhesOnibus /> */}
        {/* <RegistrarOnibus clickAdicionarOnibus={clickAdicionarOnibus} /> */}
        <BuscarOnibus
          onibus={onibus}
          contexto="default"
          /*clickDeletarOnibus={clickDeletarOnibus}*/
        />
      </div>
    </div>
  );
}

export default Onibus;
