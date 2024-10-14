// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configura el pool de conexiones a PostgreSQL
const pool = new Pool({
  connectionString: process.env.PSQL_CONNECTION,
});

// Definir el tipo de datos del comentario
type CommentFormData = {
  userName: string;
  userEmail: string;
  subject: string;
  comment: string;
};

// Función para registrar el comentario en la base de datos
const registerComment = async (data: CommentFormData) => {
  const { userName, userEmail, subject, comment } = data;

  // Inserta los datos en la base de datos
  const query = `
    INSERT INTO comments (user_name, user_email, subject, comment, comment_date, from_app)
    VALUES ($1, $2, $3, $4, NOW(), $5)
  `;
  const values = [userName, userEmail, subject, comment, 'kat_tools'];

  await pool.query(query, values);
};

export const POST = async (req: Request) => {
  try {
    const data: CommentFormData = await req.json(); // Obtiene los datos del cuerpo de la solicitud
    console.log(data);

    await registerComment(data);
    return NextResponse.json({ message: 'Comment registered successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error registering comment:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

/*

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Identificador único generado usando UUID
    user_name VARCHAR(255) NOT NULL,                -- Nombre del usuario
    user_email VARCHAR(255) NOT NULL,               -- Correo electrónico del usuario
    subject VARCHAR(255) NOT NULL,                  -- Asunto del comentario
    comment TEXT NOT NULL,                           -- Contenido del comentario
    comment_date TIMESTAMP DEFAULT NOW(),           -- Fecha y hora del comentario
    from_app VARCHAR(255) 		                    -- Aplicación de origen
);
*/
