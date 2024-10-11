// app/dashboard/TvContainer.tsx
import React from 'react';
import styles from './TvContainer.module.css';

const TvContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        // <div className={styles.backgroundAnimation}> 
        <div className={styles.tvContainer}>
            {children}
        </div>
        // </div>
    );
};

export default TvContainer;
