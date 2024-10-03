
// // pages/api/route.ts
// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";
// import { promises as fs } from 'fs';
// import { createWorker } from "tesseract.js";// Importamos Tesseract.js

// export const POST = async (req: Request) => {
//   const formData = await req.formData();

//   const language = formData.get("language") as string; 

//   if (!language) {
//     return NextResponse.json({ error: "No se selecciono el idioma." }, { status: 400 });
//   }

//   // Convierte el archivo a tipo File
//   const file = formData.get("image") as File; // Asegúrate de que la clave coincida con el frontend

//   if (!file) {
//     return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
//   }

//   // Convierte los datos del archivo a un Buffer
//   const buffer = Buffer.from(await file.arrayBuffer());

//   if (buffer.length === 0) {
//     return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
//   }

//   // Obtener la fecha actual y formatearla
//   const dateNow = new Date();
//   const year = dateNow.getFullYear();
//   const month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Meses de 0-11
//   const day = String(dateNow.getDate()).padStart(2, '0');
//   const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

//   // Obtener el nombre original del archivo y su extensión
//   const originalFilename = file.name.replace(/ /g, "_"); // Reemplaza espacios por guiones bajos
//   const extname = path.extname(originalFilename); // Obtiene la extensión del archivo
//   const baseFilename = path.basename(originalFilename, extname); // Obtiene el nombre base sin extensión

//   // Crea el nuevo nombre del archivo
//   const filename = `${baseFilename}_${formattedDate}${extname}`; // Agrega la fecha al nombre antes de la extensión

//   //console.log("Nombre del archivo:", filename); // Imprime el nombre del archivo

//   const tempDir = path.join(process.cwd(), "public", "temp"); // Crea la ruta al directorio temp

//   try {
//     // Asegúrate de que el directorio temp exista
//     await fs.mkdir(tempDir, { recursive: true });

//     const filePath = path.join(tempDir, filename); // Crea la ruta completa del archivo

//     //console.log("El archivo se guardará en:", filePath); // Imprime la ruta del archivo en la consola


//     await writeFile(filePath, buffer);

//     const worker = await createWorker(language)
//     const { data } = await worker.recognize(filePath);
//     console.log("********************");
//     console.log(data);
//     console.log("********************");


//     return NextResponse.json({ Message: "Éxito", status: 201 });
//   } catch (error) {
//     console.log("Ocurrió un error ", error);
//     return NextResponse.json({ Message: "Fallido", status: 500 });
//   }
// };





















// //pages/api/route.ts

// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";
// import { promises as fs } from 'fs';
// import { createWorker } from "tesseract.js";// Importamos Tesseract.js

// export const POST = async (req: Request) => {

//   console.log('Solicitud POST recibida');


//   const formData = await req.formData();

//   console.log('Datos recibidos:', formData);

//   console.log('Guardando lenguaje seleccionado :');
//   const language = formData.get("language") as string;

//   if (!language) {
//     return NextResponse.json({ error: "No se selecciono el idioma." }, { status: 400 });
//   }

//   console.log('lenguaje seleccionado OK:', language);

//   console.log('Recuperando la imagen seleccionada:');
//   // Convierte el archivo a tipo File
//   const file = formData.get("image") as File; // Asegúrate de que la clave coincida con el frontend

//   if (!file) {
//     return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
//   }

//   console.log('La imagen seleccionada fue recuperada');


//   // Convierte los datos del archivo a un Buffer
//   const buffer = Buffer.from(await file.arrayBuffer());

//   if (buffer.length === 0) {
//     return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
//   }


//   console.log('Formateando nombre de la imagen');
//   // Obtener la fecha actual y formatearla
//   const dateNow = new Date();
//   const year = dateNow.getFullYear();
//   const month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Meses de 0-11
//   const day = String(dateNow.getDate()).padStart(2, '0');
//   const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

//   // Obtener el nombre original del archivo y su extensión
//   const originalFilename = file.name.replace(/ /g, "_"); // Reemplaza espacios por guiones bajos
//   const extname = path.extname(originalFilename); // Obtiene la extensión del archivo
//   const baseFilename = path.basename(originalFilename, extname); // Obtiene el nombre base sin extensión

//   // Crea el nuevo nombre del archivo
//   const filename = `${baseFilename}_${formattedDate}${extname}`; // Agrega la fecha al nombre antes de la extensión
//   console.log('Formato del nombre de la imagen OK');


//   //console.log("Nombre del archivo:", filename); // Imprime el nombre del archivo
//   console.log('Guardando imagen en local storage carpeta temporal');
//   const tempDir = path.join(process.cwd(), "public", "temp"); // Crea la ruta al directorio temp


//   try {
//     await fs.mkdir(tempDir, { recursive: true });

//     const filePath = path.join(tempDir, filename);
//     await writeFile(filePath, buffer);

//     console.log('Imagen en local storage fue correctamente almacenada');
//     console.log('Path de la imagen almacenada: ', filePath);

//     console.log('Creando worker...');
//     const worker = await createWorker();
//     console.log('Worker Load...');
//     await worker.load();
//     console.log('Worker loadLanguage...');
//     await worker.loadLanguage(language);
//     console.log('Worker initialize...');
//     await worker.initialize(language);
//     console.log('enviando imagen para abstraccion de texto');
//     const { data } = await worker.recognize(filePath);
//     console.log('recibiendo respuesta de la abstraccion del texto');
//     console.log("********************");
//     console.log(data);
//     console.log("********************");

//     await worker.terminate();
//     console.log('Worker terminado');
//     console.log('Enviando respuesta al frontend');
//     return NextResponse.json({ message: "Éxito", status: 201, data });
//   } catch (error) {
//     console.log("Ocurrió un error", error);
//     return NextResponse.json({ message: "Fallido", status: 500 });
//   }
// };


/*
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { promises as fs } from 'fs';
import { createWorker } from "tesseract.js"; // Importamos Tesseract.js

export const POST = async (req: Request) => {
  console.log('Solicitud POST recibida');

  const formData = await req.formData();
  console.log('Datos recibidos:', formData);

  console.log('Guardando lenguaje seleccionado:');
  const language = formData.get("language") as string;

  if (!language) {
    return NextResponse.json({ error: "No se seleccionó el idioma." }, { status: 400 });
  }

  console.log('Lenguaje seleccionado OK:', language);

  console.log('Recuperando la imagen seleccionada:');
  // Convierte el archivo a tipo File
  const file = formData.get("image") as File; // Asegúrate de que la clave coincida con el frontend

  if (!file) {
    return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
  }

  console.log('La imagen seleccionada fue recuperada');

  // Convierte los datos del archivo a un Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length === 0) {
    return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
  }

  console.log('Formateando nombre de la imagen');
  // Obtener la fecha actual y formatearla
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Meses de 0-11
  const day = String(dateNow.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

  // Obtener el nombre original del archivo y su extensión
  const originalFilename = file.name.replace(/ /g, "_"); // Reemplaza espacios por guiones bajos
  const extname = path.extname(originalFilename); // Obtiene la extensión del archivo
  const baseFilename = path.basename(originalFilename, extname); // Obtiene el nombre base sin extensión

  // Crea el nuevo nombre del archivo
  const filename = `${baseFilename}_${formattedDate}${extname}`; // Agrega la fecha al nombre antes de la extensión
  console.log('Formato del nombre de la imagen OK');

  console.log('Guardando imagen en local storage carpeta temporal');
  const tempDir = path.join(process.cwd(), "public", "temp"); // Crea la ruta al directorio temp

  try {
    // Asegúrate de que la carpeta temp existe
    await fs.mkdir(tempDir, { recursive: true });

    const filePath = path.join(tempDir, filename);
    await writeFile(filePath, buffer);

    console.log('Imagen en local storage fue correctamente almacenada');
    console.log('Path de la imagen almacenada: ', filePath);

    console.log('Creando worker...');
    const worker = await createWorker();

    
    console.log('Worker Load...');
    await worker.load();
    console.log('Worker loadLanguage...');
    await worker.loadLanguage(language);
    console.log('Worker initialize...');
    await worker.initialize(language);
    console.log('Enviando imagen para abstracción de texto');
    const { data } = await worker.recognize(filePath);
    console.log('Recibiendo respuesta de la abstracción del texto');
    console.log("********************");
    console.log(data);
    console.log("********************");

    await worker.terminate();
    console.log('Worker terminado');
    console.log('Enviando respuesta al frontend');
    return NextResponse.json({ message: "Éxito", status: 201, data });
  } catch (error) {
    console.error("Ocurrió un error", error);
    return NextResponse.json({ message: "Fallido", status: 500 });
  }
};


*/


import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { promises as fs } from 'fs';
import { createWorker } from "tesseract.js"; // Importamos Tesseract.js

export const POST = async (req: Request) => {
  console.log('Solicitud POST recibida');

  const formData = await req.formData();
  console.log('Datos recibidos:', formData);

  console.log('Guardando lenguaje seleccionado:');
  const language = formData.get("language") as string;

  if (!language) {
    return NextResponse.json({ error: "No se seleccionó el idioma." }, { status: 400 });
  }

  console.log('Lenguaje seleccionado OK:', language);

  console.log('Recuperando la imagen seleccionada:');
  const file = formData.get("image") as File; 

  if (!file) {
    return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
  }

  console.log('La imagen seleccionada fue recuperada');

  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length === 0) {
    return NextResponse.json({ error: "El archivo está vacío." }, { status: 400 });
  }

  console.log('Formateando nombre de la imagen');
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const day = String(dateNow.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const originalFilename = file.name.replace(/ /g, "_");
  const extname = path.extname(originalFilename);
  const baseFilename = path.basename(originalFilename, extname);

  const filename = `${baseFilename}_${formattedDate}${extname}`;
  console.log('Formato del nombre de la imagen OK');

  console.log('Guardando imagen en local storage carpeta temporal');
  const tempDir = path.join(process.cwd(), "public", "temp");

  try {
    await fs.mkdir(tempDir, { recursive: true });

    const filePath = path.join(tempDir, filename);
    await writeFile(filePath, buffer);

    console.log('Imagen en local storage fue correctamente almacenada');
    console.log('Path de la imagen almacenada: ', filePath);

    console.log('Creando worker...');
    // Configuración del worker con el workerPath
    // const worker = await createWorker({
    //   workerPath: path.join(__dirname, "./node_modules/tesseract.js/src/worker-script/node/index.js"),
    //   logger: (m) => console.log(m) // Para registrar el progreso
    // });

    const worker = await createWorker();


    // const worker = await createWorker();

    console.log('Worker Load...');
    await worker.load();
    console.log('Worker loadLanguage...');
    await worker.loadLanguage(language);
    console.log('Worker initialize...');
    await worker.initialize(language);
    console.log('Enviando imagen para abstracción de texto');
    const { data } = await worker.recognize(filePath);
    console.log('Recibiendo respuesta de la abstracción del texto');
    console.log("********************");
    console.log(data);
    console.log("********************");

    await worker.terminate();
    console.log('Worker terminado');
    console.log('Enviando respuesta al frontend');
    return NextResponse.json({ message: "Éxito", status: 201, data });
  } catch (error) {
    console.error("Ocurrió un error", error);
    return NextResponse.json({ message: "Fallido", status: 500 });
  }
};
