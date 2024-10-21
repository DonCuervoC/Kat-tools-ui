/* eslint-disable @typescript-eslint/no-unused-vars */
//app/api/processImage/route.ts
/*
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { promises as fs } from 'fs';
import { createWorker } from "tesseract.js"; // Importamos Tesseract.js

export const POST = async (req: Request) => {

  const formData = await req.formData();

  const language = formData.get("language") as string;

  if (!language) {
    return NextResponse.json({ error: "No se seleccionó el idioma." }, { status: 400 });
  }


  const file = formData.get("image") as File; 

  if (!file) {
    return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
  }



  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length === 0) {
    return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
  }


  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const day = String(dateNow.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const originalFilename = file.name.replace(/ /g, "_");
  const extname = path.extname(originalFilename);
  const baseFilename = path.basename(originalFilename, extname);

  const filename = `${baseFilename}_${formattedDate}${extname}`;

  const tempDir = path.join(process.cwd(), "public", "temp");

  try {
    await fs.mkdir(tempDir, { recursive: true });

    const filePath = path.join(tempDir, filename);
    await writeFile(filePath, buffer);

    // Configuración del worker con el workerPath
    // const worker = await createWorker({
    //   workerPath: path.join(__dirname, "./node_modules/tesseract.js/src/worker-script/node/index.js"),
    //   logger: (m) => console.log(m) // Para registrar el progreso
    // });

    const worker = await createWorker();


    // const worker = await createWorker();


    await worker.load();

    await worker.loadLanguage(language);

    await worker.initialize(language);

    const { data } = await worker.recognize(filePath);

    const extractedText = data.text;
    
    await worker.terminate();

    return NextResponse.json({ message: "Success", status: 201,  extractedText });
  } catch (error) {
    console.error("Ocurrió un error", error);
    return NextResponse.json({ message: "Fallido", status: 500 });
  }
};
*/



/*
/// app/api/processImage/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { promises as fs } from 'fs';
import { createWorker } from "tesseract.js"; // Importamos Tesseract.js
import { uploadImageTempToFirebase } from "@/utils/services/google/GfilesManager";

// Función interna para guardar el archivo temporal

const saveFileToTemp = async (file: File, filename: string): Promise<string> => {
    const tempDir = path.join(process.cwd(), "public", "temp");
    
    // Asegurarse de que el directorio existe
    await fs.mkdir(tempDir, { recursive: true });

    // Crear la ruta completa del archivo
    const filePath = path.join(tempDir, filename);
    
    // Convertir el archivo en un buffer y escribirlo
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    return filePath; // Retornar la ruta del archivo guardado
};

export const POST = async (req: Request) => {
    const formData = await req.formData();
    const language = formData.get("language") as string;

    if (!language) {
        return NextResponse.json({ error: "No se seleccionó el idioma." }, { status: 400 });
    }

    const file = formData.get("image") as File; 

    if (!file) {
        return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
    }

    if (!file.size) {
        return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
    }

    try {


        const downloadURL = await uploadImageTempToFirebase(file);

        // Configuración del worker
        const worker = await createWorker(); // Crear el worker
        
        const { data } = await worker.recognize(downloadURL, { 
            lang: language // Usar el idioma pre-cargado
        });
        const extractedText = data.text;
        
        await worker.terminate();

        return NextResponse.json({ message: "Success", status: 201, extractedText });
    } catch (error) {
        console.error("Ocurrió un error", error);
        return NextResponse.json({ message: "Fallido", status: 500 });
    }
};


*/




/*




import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js"; 
import { uploadImageTempToFirebase } from "@/utils/services/google/GfilesManager";

// Función para convertir un Blob en un ArrayBuffer
const blobToArrayBuffer = (blob: Blob) => new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
});

export const POST = async (req: Request) => {
    const formData = await req.formData();
    const language = formData.get("language") as string;

    if (!language) {
        return NextResponse.json({ error: "No se seleccionó el idioma." }, { status: 400 });
    }

    const file = formData.get("image") as File; 

    if (!file) {
        return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
    }

    if (!file.size) {
        return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
    }

    try {
        // Subir la imagen a Firebase
        const downloadURL = await uploadImageTempToFirebase(file);
        
        // Obtener la imagen como Blob
        const response = await fetch(downloadURL);
        const blob = await response.blob();
        const arrayBuffer = await blobToArrayBuffer(blob); // Convertir el Blob a ArrayBuffer
        
        // Crear el worker de Tesseract
        const worker = await createWorker();
        
        await worker.load();
        await worker.loadLanguage(language);
        await worker.initialize(language);
        
        const { data } = await worker.recognize(arrayBuffer); // Procesar el ArrayBuffer directamente
        const extractedText = data.text;
        
        await worker.terminate();

        return NextResponse.json({ message: "Success", status: 201, extractedText });
    } catch (error) {
        console.error("Ocurrió un error", error);
        return NextResponse.json({ message: "Fallido", status: 500 });
    }
};


*/



/*
import { NextResponse } from "next/server";
// import { createWorker } from "tesseract.js"; // Importamos Tesseract.js
import Tesseract from "tesseract.js";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const language = formData.get("language") as string;

  if (!language) {
    return NextResponse.json({ error: "No se seleccionó el idioma." }, { status: 400 });
  }

  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length === 0) {
    return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
  }

  try {
    // Crea un worker de Tesseract.js
    // const worker = await createWorker();
    const worker = await Tesseract.createWorker();

    
    // Cargar y preparar el worker
    await worker.load();
    await worker.loadLanguage(language);
    await worker.initialize(language);
    
    // Reconocer texto a partir del buffer
    const { data } = await worker.recognize(buffer);

    const extractedText = data.text;
    
    await worker.terminate();

    return NextResponse.json({ message: "Success", status: 201, extractedText });
  } catch (error) {
    console.error("Ocurrió un error", error);
    return NextResponse.json({ message: "Fallido", status: 500 });
  }
};
*/


import { NextResponse } from "next/server";

const OCR_SPACE_API = process.env.OCR_SPACE_API;

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const language = formData.get("language") as string;
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No document was received" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type; // Detectar el tipo MIME de la imagen

  // Crear un objeto Headers
  const headers = new Headers();
  headers.append("apikey", OCR_SPACE_API || "");

  const response = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    headers: headers,
    body: new URLSearchParams({
      base64Image: `data:${mimeType};base64,${buffer.toString("base64")}`,
      language: language,
    }),
  });

  

  const result = await response.json();

  console.log("OCR API Response:", result); 
  
  // Verificar si se obtuvo texto correctamente
  if (result.ParsedResults && result.ParsedResults.length > 0) {
    const extractedText = result.ParsedResults[0].ParsedText;
    return NextResponse.json({ message: "Success", extractedText });
  } else {
    console.error("Error in OCR Parsing:", result);
    return NextResponse.json({ message: "Error extracting text", status: 500 });
  }
};









