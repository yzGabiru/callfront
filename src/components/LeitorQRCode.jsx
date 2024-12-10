import { useState } from "react";
import QrScanner from "react-qr-scanner";
import PropTypes from "prop-types";

function LeitorQRCode({ onScan }) {
  // eslint-disable-next-line no-unused-vars
  const [result, setResult] = useState("No result");

  // Função chamada quando o QR code é escaneado
  const handleScan = (data) => {
    if (data) {
      const qrText = data.text || data;
      setResult(qrText);
      if (onScan) {
        onScan(qrText);
      }
    }
  };

  // Função chamada em caso de erro
  const handleError = (err) => {
    console.error("Erro ao acessar a câmera:", err);
  };

  // Estilo do preview do vídeo
  const previewStyle = {
    height: 240,
    width: 320,
  };

  // Restrições para acessar a câmera
  const videoConstraints = {
    video: {
      facingMode: "rear", // Usa a câmera traseira (ideal para escanear QR codes)
    },
  };

  return (
    <div className="space-y-4 p-20 bg-slate-200 rounded-md shadow flex flex-col">
      <QrScanner
        delay={300} // Intervalo entre as verificações do QR code
        style={previewStyle} // Define o estilo do componente
        onError={handleError} // Função para tratar erros
        onScan={handleScan} // Função para tratar a leitura do QR code
        constraints={videoConstraints} // Restrições para uso da câmera
      />
    </div>
  );
}

// Validação de propriedades
LeitorQRCode.propTypes = {
  onScan: PropTypes.func.isRequired, // Função que será chamada ao escanear
};

export default LeitorQRCode;
