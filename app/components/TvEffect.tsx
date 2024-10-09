"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router'; // Asegúrate de estar en modo cliente
import styles from './TvEffect.module.css';

interface TvEffectProps {
  children: ReactNode;
}

const TvEffect: React.FC<TvEffectProps> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div className={`${styles.tvContainer} ${isAnimating ? styles.animating : ''}`}>
      {children}
    </div>
  );
};

export default TvEffect;
