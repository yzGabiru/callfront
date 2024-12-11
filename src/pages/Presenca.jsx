import { useState, useEffect } from "react";
import BuscarPresencas from "../components/BuscarPresencas";

function Presenca() {
  const [presencas, setPresencas] = useState([]);
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    async function buscarPresencas() {
      try {
        const response = await fetch(`${API_URL}/presenca/buscar`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar presenças");
        }

        const data = await response.json();
        console.log("Dados de presenças recebidos:", data);
        setPresencas(data.presencas || []);

        // Buscar dados de usuários associados às presenças
        const usuariosUnicos = [
          ...new Set(data.presencas.map((p) => p.id_usuario)),
        ];
        const usuariosData = await Promise.all(
          usuariosUnicos.map(async (id_usuario) => {
            const userResponse = await fetch(
              `${API_URL}/usuario/buscarUsuario?id_usuario=${id_usuario}`,
              { method: "GET" }
            );

            if (!userResponse.ok) {
              throw new Error("Erro ao buscar usuários");
            }

            const userData = await userResponse.json();
            return { id_usuario, nome: userData.usuario };
          })
        );

        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Erro na requisição:", error);
        setError(error.message);
      }
    }

    buscarPresencas();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Presenças
        </h1>
        <BuscarPresencas presencas={presencas} usuarios={usuarios} />
        {error && (
          <p className="text-red-500 text-center">Ocorreu um erro: {error}</p>
        )}
      </div>
    </div>
  );
}

export default Presenca;
