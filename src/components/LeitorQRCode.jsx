import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";

function LeitorQRCode({ onScan }) {
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    // Função para configurar a câmera traseira
    const getCameraStream = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        // Encontrar a câmera traseira
        const rearCamera = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("environment")
        );

        // Se a câmera traseira for encontrada, usar o deviceId para pegar o stream
        if (rearCamera) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: rearCamera.deviceId },
          });
          setCameraStream(stream);
        } else if (videoDevices.length > 0) {
          // Caso não tenha câmera traseira, use a primeira câmera disponível
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: videoDevices[0].deviceId },
          });
          setCameraStream(stream);
        }
      } catch (err) {
        console.error("Erro ao acessar dispositivos de mídia:", err);
      }
    };

    getCameraStream();

    // Limpeza do stream ao desmontar o componente
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
