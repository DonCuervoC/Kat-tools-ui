"use client";

import React, { useState } from 'react';
import styles from '@/app/components/imgToText/ImgtoText.module.css';
import Image from 'next/image';
import Modal from './Modal'; // Importa el modal

interface IError {
    message: string | null;
}

const ImgToText: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [language, setLanguage] = useState<string>('eng');
    const [textResult, setTextResult] = useState<string>('');
    const [error, setError] = useState<IError>({ message: null });
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para el modal

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setError({ message: 'The image file is too large. Maximum size is 5MB.' });
                setImage(null);
                return;
            }
            setImage(file);
            setError({ message: null });
        } else {
            setError({ message: 'Please upload a .jpg, .jpeg, or .png image only.' });
            setImage(null);
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = async () => {
        if (!image) {
            setError({ message: 'No image selected' });
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('language', language);

            const response = await fetch('/api/processImage', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('An error occurred while processing the image');
            }

            const result = await response.json();
            const extractedText = result.extractedText;
            setTextResult(extractedText);
            setIsModalOpen(true); // Abre el modal con el texto extraído
        } catch (err) {
            setError({ message: 'An error occurred while processing the image' });
            console.error('Error al procesar la imagen:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleErase = () => {
        setImage(null);
        setLanguage('eng');
        setTextResult('');
        setError({ message: null });
        setLoading(false);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
        setIsModalOpen(false); // Cierra el modal al eliminar todo
    };

    const downloadTxtFile = (text: string) => {
        const element = document.createElement('a');
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        const timestamp = new Date().getTime();
        element.download = `extracted-text-${timestamp}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className={styles.container}>
            <Image
                src="/cats/cat42.png"
                width={90}
                height={130}
                alt="error Cat"
            />
            <h1 className={styles.title}><strong>OCR Image to Text</strong></h1>
            <p className={styles.description}>
                Just upload an image <strong>(JPG/JPEG/PNG)</strong>, pick a language, and get the text instantly.
                Simple, fast, and reliable!
            </p>

            <label><strong>01.</strong> Upload your image:</label>
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className={`${styles.input} ${styles.focusInput}`}
                onChange={handleImageChange}
                autoFocus={true}
            />
            {error.message && (
                <div className={styles.boxError}>
                    <Image
                        src="/cats/cat18.jpg"
                        width={70}
                        height={110}
                        alt="error Cat"
                    />
                    <p className={styles.error}>{error.message}</p>
                </div>
            )}
            {loading && <div className={styles.loading}><p>Processing your image, please wait...</p></div>}
            <label><strong>02.</strong> Select Language:</label>
            <select className={styles.select} value={language} onChange={handleLanguageChange}>
                <option value="eng">English</option>
                <option value="fre">French</option>
                <option value="spa">Spanish</option>
            </select>
            <button
                onClick={handleSubmit}
                className={`${styles.button} ${loading ? styles.loadingButton : ''}`}
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
                {loading ? "Processing..." : "Submit"}
            </button>

            {/* Modal para mostrar el texto extraído */}
            <Modal isOpen={isModalOpen} onClose={handleErase} title="Extracted Text">
                <textarea className={styles.textarea} value={textResult} readOnly />
                <div className={styles.buttonContainer}>
                    <button onClick={() => downloadTxtFile(textResult)} className={styles.button}>Download as .txt</button>
                    <button onClick={handleErase} className={styles.button02}>Go Back</button>
                </div>
            </Modal>
        </div>
    );
}

export default ImgToText;
