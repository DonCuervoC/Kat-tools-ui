// app/dashboard/Sidebar.tsx
"use client";

import styles from './Dashboard.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { rubik } from '@/ui/fonts'; // Importa las fuentes

const Sidebar = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <nav className={`${styles.sidebar} ${rubik.className}`}> {/* Aplica la fuente aquí */}
      <div className={styles.backgroundImage}></div>

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Image
          src="/cats/cat23.jpg"
          width={110}
          height={170}
          className="hidden md:block"
          alt="Cat logo Arya Iberia PC version"
        />
        <Image
          // src="/cats/cat17.jpg"
          src="/cats/cat24.jpg"
          // src="/cats/cat23.jpg"
          // src="/cats/cat25.jpg"
          width={100}
          height={110}
          className="block md:hidden"
          alt="Cat logo Arya Iberia mobile version"
        />
      </div>

      <ul>
        <li>
          <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>Home</Link>
        </li>
        <li>
          <Link href="/dashboard/qrcode" className={pathname === '/dashboard/qrcode' ? styles.active : ''}>QR-code gen</Link>
        </li>
        <li>
          <Link href="/dashboard/imgtext" className={pathname === '/dashboard/imgtext' ? styles.active : ''}>From img to txt</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
