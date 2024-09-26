// app/components/qrcode/QrCodeGenerator.tsx
import React from 'react';
import QRCode from 'qrcode';
import styles from './QrCodeGenerator.module.css';


interface QrCodeGeneratorProps {
    value: string;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ value }) => {
    const [qrCodeUrl, setQrCodeUrl] = React.useState('');

    React.useEffect(() => {
        if (value) {
            QRCode.toDataURL(value).then((url) => {
                setQrCodeUrl(url);
            });
        }
    }, [value]);

    return (
        <div>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
            <button
                onClick={() => {
                    const link = document.createElement('a');
                    link.href = qrCodeUrl;
                    link.download = 'qrcode.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                className={styles.downloadButton}
            >
                Download QR Code
            </button>
        </div>
    );
};

export default QrCodeGenerator;



