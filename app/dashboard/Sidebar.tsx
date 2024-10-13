
// app/dashboard/Sidebar.tsx
"use client";

import styles from './Dashboard.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { rubik } from '@/ui/fonts'; // Importa las fuentes
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname(); // Obtener la ruta actual
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Controlar el índice del <li> sobre el que está el hover


  const navLinks = [
    // '/dashboard',
    '/dashboard/qrcode',
    '/dashboard/imgtext',
    '/dashboard/translator',
    '/dashboard/contact',
  ];


  return (
    <div className="mainContainer">
      <nav className={`${styles.sidebar} ${rubik.className}`}> {/* Aplica la fuente aquí */}
        <div className={styles.backgroundImage}></div>
        {/* <br></br> */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, borderTop: '50px solid transparent' }}>
          <Image
            src="/cats/cat23.jpg"
            width={110}
            height={170}
            className="hidden md:block"
            alt="Cat logo Arya Iberia PC version"
          />
          <Image
            src="/cats/cat24.jpg"
            width={100}
            height={110}
            className="block md:hidden"
            alt="Cat logo Arya Iberia mobile version"
          />
        </div>

        <ul>
          {/* {['/dashboard', '/dashboard/qrcode', '/dashboard/imgtext', '/dashboard/translator'].map((path, index) => ( */}
          {navLinks.map((path, index) => (
            <li
              key={path}
              onMouseEnter={() => setHoveredIndex(index)} // Cambiar el índice cuando el mouse entra
              onMouseLeave={() => setHoveredIndex(null)} // Restaurar cuando el mouse salga
              className={`${styles.navItem} ${hoveredIndex !== null
                ? hoveredIndex === index
                  ? styles.active // El que está bajo hover
                  : Math.abs(hoveredIndex - index) === 1
                    ? styles.neighbor // Los elementos vecinos
                    : ''
                : ''
                }`}
            >
              <Link
                href={path}
                className={pathname === path ? styles.activeLink : ''} // Aplicar directamente la clase
              >
                {path.replace('/dashboard/', '').replace('/', '') || 'Home'}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


