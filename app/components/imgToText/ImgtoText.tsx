//app/components/omgToText/ImgToText.tsx

"use client"; 

import React, { useState } from 'react';
import styles from '@/app/components/imgToText/ImgtoText.module.css'; // Import CSS styles for the component

export default function ImgtoText() {
  // State to manage the selected image file
  const [image, setImage] = useState<File | null>(null);
  // State to manage the selected language for OCR
  const [language, setLanguage] = useState('eng'); // Default language is English
  // State to manage the OCR result (extracted text)
  const [textResult, setTextResult] = useState<string>('');
  // State to manage any errors during processing
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);


  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Obtener el primer archivo seleccionado
  
    // Verificar si se ha seleccionado un archivo y si es de tipo imagen válido
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
      
      // Verificar el tamaño de la imagen (5MB en este ejemplo)
      const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
      if (file.size > maxSize) {
        setError('The image file is too large. Maximum size is 5MB.');
        setImage(null); // Limpia la imagen seleccionada
        return;
      }
  
      setImage(file); // Establecer la imagen seleccionada
      setError(null); // Limpiar cualquier error anterior
    } else {
      setError('Please upload a .jpg, .jpeg, or .png image only.'); // Mensaje de error para tipo de archivo inválido
      setImage(null); // Limpia la imagen seleccionada si el formato no es válido
    }
  };
  
  // Handle language selection change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value); // Update the selected language in state
  };

  // Handle form submission to send image to the backend
  const handleSubmit = async () => {
    if (!image) {
      setError('No image selected'); // Verifica si se ha seleccionado una imagen
      console.log('No se recibió ninguna imagen.'); // Log para indicar que no se recibió imagen
      return;
    }

    setLoading(true); // Comienza el estado de carga
  
    // Log de información sobre la imagen seleccionada
    // console.log('Imagen seleccionada:');
    // console.log(`Nombre: ${image.name}`); // Nombre de la imagen
    // console.log(`Tamaño: ${image.size} bytes`); // Tamaño de la imagen
    // console.log(`Tipo: ${image.type}`); // Tipo de la imagen
  
    try {
      const formData = new FormData(); // Crear un nuevo objeto FormData para enviar el archivo
      formData.append('image', image); // Agregar el archivo de imagen al FormData
      formData.append('language', language); // Agregar el idioma seleccionado

      // console.log(formData);

      console.log('Enviando datos:', formData);
      console.log('Intentando enviar la imagen a la API...');

      // Enviar una solicitud POST a la API del backend para procesar la imagen
      const response = await fetch('/api/processImage', {
        method: 'POST', // Método HTTP
        body: formData, // Enviar el FormData como cuerpo de la solicitud
      });
  
      console.log('Recibiendo respuesta del backend...');
      // Verificar si la respuesta indica un error
      if (!response.ok) {
        throw new Error('An error occurred while processing the image');
      }
      console.log('Analizar la respuesta JSON');
      const result = await response.json(); // Analizar la respuesta JSON
      setTextResult(result.text); // Actualizar el estado con el texto extraído
    } catch (err) {
      setError('An error occurred while processing the image'); // Establecer mensaje de error en caso de falla
      console.error('Error al procesar la imagen:', err); // Logar el error en la consola
    }finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  

  return (
    <div className={styles.container}>
    <h1 className={styles.Title}>OCR Image to Text</h1>
    <p>Upload an image <strong>(JPG/JPEG/PNG)</strong> with text and select the language.</p>
    <br />
    <label><strong>01.</strong> Upload your image:</label>
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      className={styles.input}
      onChange={handleImageChange}
    />
    {error && <p className={styles.error}>{error}</p>}
    {loading && <p>Processing your image, please wait...</p>}

    <label><strong>02.</strong> Select Language:</label>
    <select className={styles.select} value={language} onChange={handleLanguageChange}>
      <option value="eng">English</option>
      <option value="fra">French</option>
      <option value="spa">Spanish</option>
    </select>

    <button onClick={handleSubmit} className={styles.button}>Submit</button>

    {textResult && (
      <div className={styles.result}>
        <h2>Extracted Text:</h2>
        <textarea className={styles.textarea} value={textResult} readOnly />
        <button onClick={() => downloadTxtFile(textResult)} className={styles.button}>Download as .txt</button>
      </div>
    )}
  </div>
);
}



const downloadTxtFile = (text: string) => {
  const element = document.createElement('a');// Create a new anchor element
  const file = new Blob([text], { type: 'text/plain' });  // Create a new Blob with the text content
  element.href = URL.createObjectURL(file);// Create an object URL for the Blob
  const timestamp = new Date().getTime();
  element.download = `extracted-text-${timestamp}.txt`; // Nombre único con timestamp
  document.body.appendChild(element); // Append the anchor to the document
  element.click(); // Trigger a click on the anchor to start the download
  document.body.removeChild(element); // Remove the anchor after downloading
};
