declare module 'tesseract.js' {
    export function createWorker(): any; // Ajusta según tus necesidades
    // eslint-disable-next-line no-unused-vars
    export function loadLanguage(lang: string): Promise<void>;
    // Agrega más funciones según sea necesario
}
