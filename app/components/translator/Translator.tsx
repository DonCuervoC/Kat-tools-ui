"use client";
// Translator.tsx
import React, { useState } from 'react';
import styles from './translator.module.css';
import Image from 'next/image';

const Translator = () => {
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');
    const [autoDetect, setAutoDetect] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://libretranslate.com/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: originalText,
                    source: autoDetect ? undefined : sourceLang,
                    target: targetLang,
                    format: 'text',
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTranslatedText(data.translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Text Translator</h1>

            <div className={styles.switchContainer}>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={autoDetect}
                        onChange={() => setAutoDetect(!autoDetect)}
                    />
                    <span className={styles.slider}></span>
                </label>
                <span className={styles.switchLabel}>Automatic Language Detection</span>
            </div>

            <div className={styles.languageSelection}>
                {/* Mostrar el mensaje si autoDetect está habilitado */}
                {autoDetect ? (
                    <div >
                        <Image
                            width={40}
                            height={70}
                            src="/cats/cat30.jpg"
                            alt="Auto detected CAT"
                           
                        />
                
                    </div>

                ) : (
                    <select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                        className={styles.select}
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                )}

                <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className={styles.select}
                >
                    <option value="es">Spanish</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>

                <button onClick={handleTranslate} className={styles.button}>
                    Translate
                </button>
            </div>

            {/* Indicador de carga */}
            {loading && <div className={styles.loading}>Translating...</div>}

            {/* Áreas de texto para entrada y salida */}
            <div className={styles.textAreas}>
                <textarea
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    className={styles.textarea}
                    placeholder="Enter text to translate"
                />

                <textarea
                    value={translatedText}
                    readOnly
                    className={styles.textarea}
                    placeholder="Translated text will appear here"
                />
            </div>
        </div>
    );
};

export default Translator;
