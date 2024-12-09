// import { useState } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CadastroUsuario() {
  const [usuario, setUsuario] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //funcao adicionar onibus
  async function clickAdicionarusuario(
    nome,
    email,
    senha,
    confirmarSenha,
    numeroCelular
  ) {
    const novoUsuario = {
      id_usuario: v4(),
      nome: nome,
      email: email,
      senha: senha,
      confirmarSenha: confirmarSenha,
      numeroCelular: numeroCelular,
    };
    console.log(novoUsuario);

    // Atualiza localmente
    setUsuario([...usuario, novoUsuario]);

    // Faz a chamada para a API
    try {
      const response = await fetch(
        "https://callback-ivory.vercel.app/usuario/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoUsuario),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erro desconhecido");
      }

      const data = await response.json();
      console.log("Registro bem-sucedido:", data);
      setError("");
      navigate("/usuario/login");
      return true;
    } catch (error) {
      console.error("Erro na API:", error);
      setError(error.message);
      return false;
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
            Cadastro
          </h1>
        </div>
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setNome(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Número Celular"
            value={numeroCelular}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setNumeroCelular(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setSenha(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setConfirmarSenha(event.target.value);
            }}
          />
          <button
            className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
            onClick={async () => {
              if (
                !nome ||
                !email ||
                !senha ||
                !confirmarSenha ||
                !numeroCelular
              ) {
                alert("Preencha todos os campos");
                return;
              }
              if (senha !== confirmarSenha) {
                alert("Senhas não conferem");
                return;
              }

              const sucesso = await clickAdicionarusuario(
                nome,
                email,
                senha,
                confirmarSenha,
                numeroCelular
              );

              if (sucesso) {
                // Limpa os campos
                setNome("");
                setEmail("");
                setSenha("");
                setConfirmarSenha("");
                setNumeroCelular("");
              } else {
                alert("Falha no cadastro, tente novamente!");
              }
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
        </div>
      </div>
    </div>
  );
}

CadastroUsuario.propTypes = {
  clickAdicionarOnibus: PropTypes.func,
};

export default CadastroUsuario;
