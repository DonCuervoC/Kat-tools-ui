"use client";

import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "@/constants";
// import useStore from "@/hooks/useStore";
// import { useDebounce } from "../useDebounce";
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from "../Icons";
import { LanguageSelector } from "./LanguageSelector";
import { SectionType } from "@/app/@types/types.d";
import { TextArea } from "../TextArea";
import { useEffect } from "react";
import { useDebounce } from "../useDebounce";
// import { relative } from "path";
import { useStore } from "@/hooks/useStore";
// import { translate } from "@/app/api/translate/route";
// import TextArea from "../TextArea";
import styles from './Translator.module.css';
import Image from 'next/image';

export default function TranslatorAi() {

    // //3. use hook useReducer
    //3.1 Use personilice UseStore with the useReducer
    const {
        loading,
        fromLanguage,
        fromText,
        result,
        toLanguage,
        setFromLanguage,
        setToLanguage,
        interchangeLanguages,
        setFromText,
        setResult } = useStore();

    const debounceFromText = useDebounce(fromText, 400);

    useEffect(() => {
        if (debounceFromText === '') return;
        if (debounceFromText === result) return;

        // Llamar a la API del servidor
        fetch('/api/translate', { // Actualizamos la ruta aquí
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fromLanguage, toLanguage, text: debounceFromText })
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    setResult(data.result);
                } else {
                    setResult('Error in translation');
                }
            })
            .catch(() => setResult('Error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceFromText, fromLanguage, toLanguage]); // Aseguramos que también cambie si se modifica el idioma

    const handleClipboard = () => {
        navigator.clipboard.writeText(result).catch(() => { })
    }

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(result)
        utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
        utterance.rate = 0.9
        speechSynthesis.speak(utterance)
    }


    return (
        <div className={styles.container}>

            <Container fluid>

                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <Image
                        width={70}
                        height={100}
                        src="/cats/cat22.jpg"
                        alt="Auto detected CAT"
                    />
                    <h2 className={styles.title}>Michi Translate</h2>
                    <h5>Powered by AI</h5>

                </div>

                <Row>
                    <Col>
                        <Stack gap={2}>
                            <LanguageSelector
                                type={SectionType.From}
                                value={fromLanguage}
                                onChange={setFromLanguage}
                            />

                            <TextArea
                                type={SectionType.From}
                                value={fromText}
                                onChange={setFromText}
                            />
                        </Stack>

                    </Col>

                    <Col xs='auto' >
                        <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                            <ArrowsIcon />
                        </Button>
                    </Col>

                    <Col>
                        <Stack gap={2}>
                            <LanguageSelector
                                type={SectionType.To}
                                value={toLanguage}
                                onChange={setToLanguage}
                            />
                            <div style={{ position: 'relative' }}>
                                <TextArea
                                    loading={loading}
                                    type={SectionType.To}
                                    value={result}
                                    onChange={setResult}
                                />
                                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                                    <Button
                                        variant='link'
                                        onClick={handleClipboard}>
                                        <ClipboardIcon />
                                    </Button>
                                    <Button
                                        variant='link'
                                        onClick={handleSpeak}>
                                        <SpeakerIcon />
                                    </Button>
                                </div>

                            </div>
                        </Stack>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}
