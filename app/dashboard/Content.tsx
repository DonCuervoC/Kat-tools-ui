// app/dashboard/Content.tsx
import { ReactNode } from 'react';
// import styles from './Content.module.css'; // Importa el módulo de estilos

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div >{children}</div>; // Aplica la clase de estilos
};

export default Content;
