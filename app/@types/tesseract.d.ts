declare module 'tesseract.js' {
    export function createWorker(): any; // Ajusta según tus necesidades
    export function loadLanguage(lang: string): Promise<void>;
    // Agrega más funciones según sea necesario
}
