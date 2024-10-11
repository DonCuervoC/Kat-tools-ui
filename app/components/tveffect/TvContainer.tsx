// // app/dashboard/TvContainer.tsx
// import React from 'react';
// import styles from './TvContainer.module.css';


// const TvContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return (
//         <div className={styles.tvContainer}>
//             <div className={styles.backgroundEffect} />
//             {children}
//         </div>
//     );
// };

// export default TvContainer;

"use client"; // Asegúrate de que sea un componente de cliente
import React, { useEffect, useState } from 'react';
import styles from './TvContainer.module.css';

const videos = [
    // 'https://cdn.pixabay.com/video/2020/12/15/59291-492700392_large.mp4',
    // 'https://cdn.pixabay.com/video/2017/07/23/10851-226632936_large.mp4',
    // 'https://cdn.pixabay.com/video/2019/02/05/21175-315405446_large.mp4'
    // 'https://cdn.pixabay.com/video/2020/05/13/39009-420224623_large.mp4',
    // 'https://cdn.pixabay.com/video/2020/05/13/39011-420224644_large.mp4',
    // 'https://cdn.pixabay.com/video/2020/08/02/46226-447422835_large.mp4'
    'https://cdn.pixabay.com/video/2022/06/13/120172-720504774_large.mp4',
    // 'https://cdn.pixabay.com/video/2020/11/30/57904-486852810_large.mp4',
//    'https://cdn.pixabay.com/video/2016/09/13/5142-183300133_large.mp4',
];

const TvContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
            // }, 120000); // Cambia el video cada 2 minutos
            // }, 30000); // Cambia el video cada 30 segundos (30000 ms)
        }, 10000); // Cambia el video cada 10 segundos (10000 ms)

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.container}>
            <video
                className={styles.videoBackground}
                src={videos[currentVideoIndex]}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className={styles.tvContainer}>
                {children}
            </div>
        </div>
    );
};

export default TvContainer;
