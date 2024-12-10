import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";

function LeitorQRCode({ onScan }) {
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    // Função para configurar a câmera traseira
    const getCameraStream = async () => {
      try {
        // Obtém todos os dispositivos de mídia
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        console.log("Dispositivos de vídeo detectados:", videoDevices); // Log de todos os dispositivos de vídeo

        // Vamos buscar qualquer dispositivo que tenha 'environment' no nome, que é a câmera traseira
        const rearCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("environment")
        );

        console.log("Câmera traseira encontrada:", rearCamera);

        // Se encontramos a câmera traseira, usar seu deviceId
        if (rearCamera) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: rearCamera.deviceId },
          });
          setCameraStream(stream);
        } else if (videoDevices.length > 0) {
          // Se não encontrou a câmera traseira, tenta a primeira câmera disponível
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: videoDevices[0].deviceId },
          });
          setCameraStream(stream);
        } else {
          console.error("Nenhuma câmera disponível.");
        }
      } catch (err) {
        console.error("Erro ao acessar dispositivos de mídia:", err);
      }
    };

    getCameraStream();

    // Limpeza do stream quando o componente for desmontado
    return () => {
      if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  const handleScan = (data) => {
    if (data) {
      onScan(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="space-y-4 p-20 bg-slate-200 rounded-md shadow flex flex-col">
      {cameraStream ? (
        <QrScanner
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          videoStream={cameraStream} // Passa o stream para o QrScanner
        />
      ) : (
        <p>Procurando por câmeras...</p>
      )}
    </div>
  );
}

LeitorQRCode.propTypes = {
  onScan: PropTypes.func.isRequired,
};

export default LeitorQRCode;
