import { useState } from "react";
import QrScanner from "react-qr-scanner";
import PropTypes from "prop-types";

function LeitorQRCode({ onScan }) {
  // eslint-disable-next-line no-unused-vars
  const [result, setResult] = useState("No result");

  // Função chamada quando o QR code é escaneado
  const handleScan = (result) => {
    if (result) {
      console.log("Dados recebidos do QR Code:", result);
      const qrText =
        result.text?.trim() ||
        new TextDecoder().decode(result.rawBytes) ||
        "Dados não encontrados";
      setResult(qrText);
      if (onScan) {
        onScan(qrText);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
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
      facingMode: { ideal: "environment" }, // Solicita explicitamente a câmera traseira
    },
  };

  return (
    <div className="space-y-4 p-20 bg-slate-200 rounded-md shadow flex flex-col">
      <QrScanner
        delay={300} // Intervalo entre as verificações do QR code
        style={previewStyle} // Define o estilo do componente
        onError={(err) => {
          console.error(
            "Erro ao acessar a câmera, tentando a câmera frontal:",
            err
          );
          videoConstraints.video.facingMode = { ideal: "user" }; // Fallback para câmera frontal
        }}
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
