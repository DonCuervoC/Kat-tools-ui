import React from 'react';
import QRCode from 'qrcode';
import styles from './QrCodeGenerator.module.css';
import Image from 'next/image';
import { rubik } from '@/ui/fonts'; // Importa las fuentes

interface QrCodeGeneratorProps {
    value: string | { key: string; value: string }[];
    onClose: () => void;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ value, onClose }) => {
    const [qrCodeUrl, setQrCodeUrl] = React.useState('');

    React.useEffect(() => {
        const generateQRCode = async () => {
            const data = typeof value === 'string' ? value : JSON.stringify(value);
            const url = await QRCode.toDataURL(data);
            setQrCodeUrl(url);
        };

        generateQRCode();
    }, [value]);

    return (
        <div className={`${styles.qrCodeContainer} ${rubik.className}`}>
            {qrCodeUrl && (
                <div className={styles.qrCodeOutput}>
                    <div className={styles.messageContainer}>
                        <p className={styles.Description}>
                            Cool! Here&apos;s your <strong>QR Code!</strong>
                        </p>
                        <Image
                            width={70}
                            height={100}
                            src="/cats/cat28.jpg"
                            alt="QR Code"
                            className={styles.qrCodeImage}
                        />
                    </div>

                    {/* QR Code image centered */}
                    <div className={styles.qrCodeCenterContainer}>
                        <Image
                            src={qrCodeUrl}
                            width={210}
                            height={270}
                            alt="QR Code Pc version"
                        />
                    </div>
                </div>
            )}
            <button
                onClick={() => {
                    const link = document.createElement('a');
                    link.href = qrCodeUrl;
                    link.download = 'qrcode.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                className={styles.button}
            >
                Download QR Code
            </button>
            <button onClick={onClose} className={styles.button}>
                Close
            </button>
        </div>
    );
};

export default QrCodeGenerator;
