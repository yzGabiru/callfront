import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BuscarOnibus from "../components/BuscarOnibus";

function OnibusAdmin() {
  const [onibus, setOnibus] = useState([]);
  useEffect(() => {
    async function buscarOnibus() {
      const response = await fetch(
        "https://callback-ivory.vercel.app/onibus/buscar",
        {
          method: "GET",
        }
      );
      const data = await response.json();
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
        <BuscarOnibus onibus={onibus} contexto="admin" />
      </div>
    </div>
  );
}

export default OnibusAdmin;
