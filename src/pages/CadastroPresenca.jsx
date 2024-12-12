/* eslint-disable no-unused-vars */
// import { useState } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Presenca from "./Presenca";

function CadastroPresenca() {
  const [presenca, setNovaPresenca] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data_chamada, setDataChamada] = useState("");
  const [vai, setVai] = useState("");
  const [volta, setVolta] = useState("");
  const [status_presenca, setPresenca] = useState("");
  const token = localStorage.getItem("authToken");

  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  const dataHoje = `${ano}-${mes}-${dia}`;

  const API_URL = import.meta.env.VITE_API_URL;

  //funcao adicionar onibus
  async function clickAdicionarPresenca(
    id_usuario,
    id_onibus,
    vai,
    volta,
    data_chamada
  ) {
    const novaPresenca = {
      id_usuario,
      id_onibus,
      vai,
      volta,
      data: data_chamada,
      status_presenca: "AUSENTE",
    };
    console.log(novaPresenca);

    // Atualiza localmente
    setNovaPresenca([...presenca, novaPresenca]);
    console.log("Enviando para API:", novaPresenca);

    // Faz a chamada para a API
    try {
      const response = await fetch(`${API_URL}/presenca/adicionar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaPresenca),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || "Erro desconhecido");
      }

      const data = await response.json();
      console.log("Registro bem-sucedido:", data);
      setError("");
      setSuccess("Presença adicionada com sucesso!");
    } catch (error) {
      console.error("Erro na API:", error);
      setError(error.message);
    }
  }

  function pegarIdUser() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Você precisa estar logado para acessar essa página");
      return;
    }
    return userId;
  }
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function buscarPresencas() {
    const userId = pegarIdUser();

    try {
      const response = await fetch(`${API_URL}/presenca/buscar/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || "Erro desconhecido");
      }
      const data = await response.json();

      if (!data.presencas) {
        setError("Você não tem presenças registradas");
        console.log("nenhuma presenca registrada");
      }
      // Transformar os dados no formato esperado
      // Ao buscar as presenças, ao transformar a data:
      const presencasFormatadas = data.presencas.map((item) => {
        const dataChamada = new Date(item.data_chamada); // Recebe a data do banco
        const dataLocal = dataChamada.toLocaleDateString("pt-BR", {
          timeZone: "UTC", // Garantir que a data seja tratada como UTC
        });
        return {
          data: dataLocal,
          vai: item.vai,
          volta: item.volta,
        };
      });

      setNovaPresenca(presencasFormatadas); // Atualizar estado com os dados formatados
    } catch (err) {
      console.error("ocorreu um erro ao buscar os usuarios", err);
    }
  }
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
            Cadastro de Presenças
          </h1>
        </div>
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
          <input
            type="date"
            placeholder="Data da chamada"
            value={data_chamada}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setDataChamada(event.target.value);
            }}
          />
          <select
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            value={
              vai && volta
                ? "vai_volta"
                : vai
                ? "so_vai"
                : volta
                ? "so_volta"
                : ""
            }
            onChange={(event) => {
              const value = event.target.value;
              console.log(value);
              if (value === "so_vai") {
                setVai(true);
                setVolta(false);
              } else if (value === "so_volta") {
                setVai(false);
                setVolta(true);
              } else if (value === "vai_volta") {
                setVai(true);
                setVolta(true);
              } else {
                setVai(false);
                setVolta(false);
              }
            }}
          >
            <option value="">Selecione uma opção</option>
            <option value="so_vai">Só vai</option>
            <option value="so_volta">Só volta</option>
            <option value="vai_volta">Vai e volta</option>
          </select>

          {/* <select
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            value={status_presenca}
            onChange={(event) => {
              setPresenca(event.target.value);
            }}
          >
            <option value="PRESENTE">Presente</option>
            <option value="AUSENTE">Ausente</option>
          </select> */}
          <button
            className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
            onClick={() => {
              if (!data_chamada || (vai === false && volta === false)) {
                alert("Preencha todos os campos corretamente.");
                return;
              }
              if (data_chamada < dataHoje) {
                alert("Data de chamada não pode ser menor que a data atual");
                setDataChamada("");
                setPresenca("");
                return;
              }
              const id_usuario = pegarIdUser();
              const id_onibus = searchParams.get("onibus");

              console.log(vai, volta);
              clickAdicionarPresenca(
                id_usuario,
                id_onibus,
                vai,
                volta,
                data_chamada,
                status_presenca
              );
              setDataChamada("");
              setPresenca("");
              setSuccess("");
            }}
          >
            Cadastrar
          </button>

          {/* exibe o erro se tiver */}
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
        <Presenca presencas={presenca} buscarPresencas={buscarPresencas} />
      </div>
    </div>
  );
}

CadastroPresenca.propTypes = {
  clickAdicionarOnibus: PropTypes.func,
};

export default CadastroPresenca;
