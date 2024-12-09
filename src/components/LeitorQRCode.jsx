import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";

function LeitorQRCode({ onScan }) {
  const [cameraId, setCameraId] = useState(null);

  useEffect(() => {
    // Verificar as câmeras disponíveis
    const getCameras = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      // Tentar selecionar a câmera traseira
      const rearCamera = videoDevices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("environment")
      );

      // Se encontrar a câmera traseira, configurar o id
      if (rearCamera) {
        setCameraId(rearCamera.deviceId);
      } else if (videoDevices.length > 0) {
        // Caso contrário, usar a primeira câmera encontrada
        setCameraId(videoDevices[2].deviceId);
      }
    };

    getCameras();
  }, []);

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
      {cameraId ? (
        <QrScanner
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          facingMode="environment"
          deviceId={cameraId} // Passa o id da câmera selecionada
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
