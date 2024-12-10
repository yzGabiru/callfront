import { useState } from "react";
import QrScanner from "react-qr-scanner";
import PropTypes from "prop-types";

function LeitorQRCode({ onScan }) {
  const [result, setResult] = useState("No result");

  // Função chamada quando o QR code é escaneado
  const handleScan = (data) => {
    if (data) {
      const qrText = data.text || data; // Garante que o texto seja obtido corretamente
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
      facingMode: { exact: "environment" }, // Solicita explicitamente a câmera traseira
    },
  };

  return (
    <div>
      <QrScanner
        delay={300} // Intervalo entre as verificações do QR code
        style={previewStyle} // Define o estilo do componente
        onError={handleError} // Função para tratar erros
        onScan={handleScan} // Função para tratar a leitura do QR code
        constraints={videoConstraints} // Restrições para uso da câmera
      />
      <p>Resultado: {result}</p> {/* Mostra o resultado na tela */}
    </div>
  );
}

// Validação de propriedades
LeitorQRCode.propTypes = {
  onScan: PropTypes.func.isRequired, // Função que será chamada ao escanear
};

export default LeitorQRCode;
