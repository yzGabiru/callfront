import { useState } from "react";
import PropTypes from "prop-types";

function RegistrarOnibus({ clickAdicionarOnibus }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <input
        type="text"
        placeholder="Nome do Onibus"
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={nome}
        onChange={(event) => {
          setNome(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Descrição do Onibus"
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={descricao}
        onChange={(event) => {
          setDescricao(event.target.value);
        }}
      />
      <button
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        onClick={() => {
          if (!nome.trim() || !descricao.trim()) {
            return alert("Preencha todos os campos!");
          }

          clickAdicionarOnibus(nome, descricao);
          setNome("");
          setDescricao("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

RegistrarOnibus.propTypes = {
  clickAdicionarOnibus: PropTypes.func,
};

export default RegistrarOnibus;
