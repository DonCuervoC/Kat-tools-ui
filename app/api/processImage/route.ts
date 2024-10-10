//app/api/processImage/route.ts
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
