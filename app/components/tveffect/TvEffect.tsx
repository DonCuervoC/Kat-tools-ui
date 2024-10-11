// "use client";
// import { useEffect, useState } from 'react';
// import styles from '@/app/components/tveffect/TvEffect.module.css';

// interface TvEffectProps {
//   children: React.ReactNode;
//   timeMs: number; // Duración de la animación
// }

// const TvEffect = ({ children, timeMs }: TvEffectProps) => {
//   const [isAnimating, setIsAnimating] = useState(true); // Controla la animación

//   useEffect(() => {
//     // Iniciar la animación cuando se monta el componente
//     setIsAnimating(true);

//     const timer = setTimeout(() => {
//       setIsAnimating(false); // Finaliza la animación
//     }, timeMs);

//     // Limpiar el temporizador al desmontar el componente
//     return () => clearTimeout(timer);
//   }, [timeMs]);

//   return (
//     <div className={styles.container}>
//       {isAnimating && <div className={styles.tvOn}></div>}
//       <div className={`${styles.content} ${isAnimating ? styles.hidden : ''}`}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default TvEffect;

//app/components/tveffect/EvEffect.tsx
"use client";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // Importamos createPortal para usar un portal
import styles from '@/app/components/tveffect/TvEffect.module.css';

interface TvEffectProps {
  children: React.ReactNode;
  timeMs: number; // Duración de la animación
}

const TvEffect = ({ children, timeMs }: TvEffectProps) => {
  const [isAnimating, setIsAnimating] = useState(true); // Controla la animación
  const [effectContainer, setEffectContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Crear un nuevo contenedor para el efecto en el DOM
    const container = document.createElement('div');
    document.body.appendChild(container);
    setEffectContainer(container);

    // Iniciar la animación cuando se monta el componente
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false); // Finaliza la animación
    }, timeMs);

    // Limpiar el temporizador y el contenedor del DOM al desmontar el componente
    return () => {
      clearTimeout(timer);
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, [timeMs]);

  // Renderizamos los hijos normalmente, sin afectar su layout
  return (
    <>
      {children}

      {/* El portal solo renderiza el efecto en otro lugar del DOM, sin alterar el flujo del layout */}
      {isAnimating && effectContainer &&
        createPortal(
          <div className={styles.tvOn}></div>,
          effectContainer
        )}
    </>
  );
};

export default TvEffect;

