import { useNavigate, useSearchParams } from "react-router-dom";

function DetalhesOnibus() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const descricao = searchParams.get("descricao");

  const displayNome = nome || "Nome não disponível";
  const displayDescricao = descricao || "Descrição não disponível";

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="flex justify-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 bottom-0 bg-slate-400 p-2 rounded-md text-white"
        >
          Voltar
        </button>
        <h1 className="text-3xl text-slate-100 font-bold text-center p-3">
          Descrição do Ônibus
        </h1>
      </div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        <li className="flex gap-2 flex-col">
          <button className="bg-slate-800 text-white p-2 rounded-md w-full">
            {displayNome}
          </button>
          <button className="bg-slate-400 text-white p-2 rounded-md w-full">
            {displayDescricao}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DetalhesOnibus;
