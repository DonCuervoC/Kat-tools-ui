"use client";
import React, { useRef, useEffect, useState } from 'react';
import styles from './SignaturePad.module.css'; // Importa el módulo CSS
import Image from 'next/image';

const SignaturePad: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);  // Create a reference for the canvas element
    const [isDrawing, setIsDrawing] = useState(false);  // State to track if the user is currently drawing on the canvas
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null); // State to store the 2D rendering context of the canvas
    const [strokes, setStrokes] = useState<Array<ImageData>>([]);  // State to keep an array of ImageData representing each stroke
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);  // State to track which button is currently being hovered

    // useEffect hook to initialize the canvas rendering context once the component mounts
    useEffect(() => {
        const canvas = canvasRef.current; // Get the canvas reference
        if (canvas) {
            const context = canvas.getContext('2d'); // Get the 2D drawing context
            if (context) {
                setCtx(context); // Set the context state
                context.lineWidth = 2; // Set the width of the strokes
                context.lineCap = 'round'; // Set the shape of the end of the strokes
                context.strokeStyle = 'black'; // Set the color of the strokes
            }
        }
    }, []); // Empty dependency array means this runs only once when the component mounts

    // Function to get the mouse position relative to the canvas
    const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;  // Get the canvas reference
        if (canvas) {
            const rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
            const scaleX = canvas.width / rect.width; // Calculate scale in the X direction
            const scaleY = canvas.height / rect.height; // Calculate scale in the Y direction
            return {
                x: (e.clientX - rect.left) * scaleX, // Calculate the mouse X position on the canvas
                y: (e.clientY - rect.top) * scaleY,  // Calculate the mouse Y position on the canvas
            };
        }
        return { x: 0, y: 0 };  // Return default values if the canvas reference is not available
    };

    // Function to start drawing when the mouse is pressed down
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (ctx) {
            const { x, y } = getMousePosition(e);  // Get the mouse position on the canvas
            ctx.beginPath(); // Begin a new path for the stroke
            ctx.moveTo(x, y); // Move the context to the starting position
            setIsDrawing(true); // Set the drawing state to true
        }
    };

    // Function to draw on the canvas as the mouse moves
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !ctx) return; // Exit if not drawing or context is not available
        const { x, y } = getMousePosition(e); // Get the current mouse position
        ctx.lineTo(x, y);  // Draw a line to the current mouse position
        ctx.stroke();  // Render the stroke on the canvas
    };

    // Function to stop drawing when the mouse is released or leaves the canvas
    const stopDrawing = () => {
        if (ctx) {
            ctx.closePath(); // Close the current path
            saveCurrentStroke(); // Save the current stroke to the strokes array
        }
        setIsDrawing(false); // Set the drawing state to false
    };

    // Function to save the current stroke as ImageData
    const saveCurrentStroke = () => {
        if (canvasRef.current) {
            const newStroke = ctx?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height); // Get the ImageData of the current canvas
            if (newStroke) {
                setStrokes((prevStrokes) => [...prevStrokes, newStroke]); // Add the new stroke to the strokes array
            }
        }
    };

    // Function to undo the last stroke
    const undo = () => {
        if (strokes.length > 0) { // Check if there are strokes to undo
            const newStrokes = [...strokes]; // Create a copy of the strokes array
            newStrokes.pop(); // Remove the last stroke
            setStrokes(newStrokes); // Update the strokes state
            const lastStroke = newStrokes[newStrokes.length - 1]; // Get the last stroke after popping
            if (canvasRef.current && ctx && lastStroke) {
                ctx.putImageData(lastStroke, 0, 0); // Redraw the last stroke on the canvas
            } else {
                resetCanvas(); // If no strokes are left, reset the canvas
            }
        }
    };

    // Function to reset the canvas and clear all strokes
    const resetCanvas = () => {
        const canvas = canvasRef.current; // Get the canvas reference
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
            setStrokes([]); // Clear the strokes state
        }
    };

    return (
        <div className={styles.container}  >
            <Image
                width={100}
                height={140}
                src="/cats/cat43.png"
                alt="Cat contact PC big version"
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <h1 className={styles.Title}><strong>Signature .png</strong></h1>
            <p className={styles.paragraph}>
                Create your unique digital signature effortlessly.<br />
                Sign, save, and share your mark in just a few clicks!
            </p>

            {/* Cambiar el tamaño del canvas usando los atributos width y height */}
            <canvas
                ref={canvasRef} // Attach the canvas reference
                width={500}
                height={300}
                onMouseDown={startDrawing} // Start drawing on mouse down
                onMouseMove={draw} // Draw on mouse move
                onMouseUp={stopDrawing} // Stop drawing on mouse up
                onMouseLeave={stopDrawing} // Stop drawing when mouse leaves the canvas
                style={{
                    border: '1px solid black',
                    width: '100%',// Make the canvas responsive
                    height: 'auto', // Make the canvas responsive
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                    outline: 'none',
                }}
                onFocus={(e) => e.currentTarget.style.outline = '2px solid lightblue'}
                tabIndex={0}
            />

            <div className={styles.buttonContainer}>
                <button
                    onMouseEnter={() => setHoveredButton('download')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => {
                        if (canvasRef.current) {
                            const dataURL = canvasRef.current.toDataURL();
                            const link = document.createElement('a');
                            link.href = dataURL;
                            link.download = 'signature.png';
                            link.click();
                        }
                    }}
                    className={`${styles.button} ${hoveredButton === 'download' ? styles.downloadHover : ''}`}
                    title="Download" // Texto alternativo
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
                        <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                        <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                    </svg>
                </button>
                <button
                    onMouseEnter={() => setHoveredButton('undo')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={undo}
                    className={`${styles.button} ${hoveredButton === 'undo' ? styles.undoHover : ''}`}
                    title="Undo" // Texto alternativo
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                    </svg>
                </button>
                <button
                    onMouseEnter={() => setHoveredButton('delete')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={resetCanvas}
                    className={`${styles.button} ${hoveredButton === 'delete' ? styles.deleteHover : ''}`}
                    title="Delete" // Texto alternativo
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5a.5.5 0 0 1 .528-.47Z" />
                    </svg>
                </button>
            </div>





        </div>
    );
};

export default SignaturePad;
