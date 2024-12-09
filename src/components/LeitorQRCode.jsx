import PropTypes from "prop-types";
import QrScanner from "react-qr-scanner";

function LeitorQRCode({ onScan }) {
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
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment" // Define que a câmera traseira será utilizada
      />
    </div>
  );
}

LeitorQRCode.propTypes = {
  onScan: PropTypes.func.isRequired, // Define que a função onScan é obrigatória
};

export default LeitorQRCode;
