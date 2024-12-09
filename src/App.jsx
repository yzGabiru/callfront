import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-slate-500 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-4xl text-slate-100 font-bold text-center">
        Site Presença
      </h1>
      <div className="space-y-4">
        <button
          className="w-[200px] py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => navigate("/usuario/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
