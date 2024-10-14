// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configura el pool de conexiones a PostgreSQL
const pool = new Pool({
  connectionString: process.env.PSQL_CONNECTION,
});

//Definir el tipo de datos del formulario
type VisitorFormData = {
  companyName: string;
  name: string;
  email: string;
  type: 'anonymous' | 'registered';
  date: string;
};

// Función para registrar al visitante en la base de datos
const registerVisitor = async (data: VisitorFormData) => {
  const { companyName, name, email, type } = data;

  // Inserta los datos en la base de datos
  /*
const query = 
`
  INSERT INTO visitors (company_name, name, email, type, visit_date)
  VALUES ($1, $2, $3, $4, NOW())
`;
const values = [companyName, name, email, type];
*/

  const query = `
INSERT INTO visitors (company_name, name, email, type, visit_date, from_app)
VALUES ($1, $2, $3, $4, NOW(), $5)
`;
  const values = [companyName, name, email, type, 'kat_tools'];
  await pool.query(query, values);
};

export const POST = async (req: Request) => {
  try {
    const data: VisitorFormData = await req.json(); // Obtiene los datos del cuerpo de la solicitud
    // const now = new Date();

    if (data.type === 'anonymous') {
      data.companyName = 'n/a'
      data.name = 'n/a'
      data.email = 'n/a'
    }
    // data.date = String(now);

    console.log(data);

    await registerVisitor(data);
    return NextResponse.json({ message: 'Visitor registered successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error registering visitor:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};


/*

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Habilita la extensión UUID si no está habilitada

CREATE TABLE visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Identificador único generado usando UUID
    company_name VARCHAR(255) NOT NULL,             -- Nombre de la empresa
    name VARCHAR(255) NOT NULL,                       -- Nombre del visitante
    email VARCHAR(255) NOT NULL,                      -- Correo electrónico del visitante
    type VARCHAR(50) NOT NULL,                        -- Tipo de visitante (anónimo o registrado)
    visit_date TIMESTAMP DEFAULT NOW()                -- Fecha y hora de la visita
);


*/