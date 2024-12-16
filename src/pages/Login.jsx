// import { useState } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //funcao adicionar onibus
  async function clickLogarUsuario(email, senha) {
    const novoLogin = {
      email: email,
      senha: senha,
    };
    setLogin([...login, novoLogin]);

    // Faz a chamada para a API

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLogin),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erro desconhecido");
      }

      const data = await response.json();
      console.log("Login bem-sucedido:", data);
      setError("");
      //armazenar o token de acesso no local storage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("e_admin", data.e_admin);

      // Redireciona com base no privilégio
      if (data.e_admin) {
        navigate("/admin"); // Página de admin
      } else {
        navigate("/onibus"); // Página normal
      }

      //pra usar ele
      //   const token = localStorage.getItem("authToken");
      //   if (!token) {
      //     console.error("Token não encontrado, usuário não autenticado");
      //     return;
      //   }
    } catch (error) {
      console.error("Erro na API:", error);
      setError(error.message);
    }
  }
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">Login</h1>
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
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
            type="password"
            placeholder="Senha"
            value={senha}
            className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            onChange={(event) => {
              setSenha(event.target.value);
            }}
          />
          <button
            className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
            onClick={() => {
              if (!email || !senha) {
                alert("Preencha todos os campos");
              }
              setError("");
              clickLogarUsuario(email, senha);
              setEmail("");
              setSenha("");
            }}
          >
            Fazer Login
          </button>
          <div>
            <button
              onClick={() => {
                navigate("/usuario/cadastro");
              }}
            >
              Não tem uma conta?
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
    </div>
  );
}

Login.propTypes = {
  clickAdicionarOnibus: PropTypes.func,
};

export default Login;
