// app/components/Popup.tsx
import React from 'react';
import Styles from './Popup.module.css';
import Image from 'next/image';

type PopupProps = {
    message: string;
    onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
        <div className={Styles.overlay}>
            <div className={Styles.popup}>


                {/* <img src="/path/to/thank-you-image.png" alt="Thank You" className={Styles.image} /> */}

                <Image
                    width={120}
                    height={160}
                    src="/cats/cat32.jpg"
                    alt="Cat contact"
                    className={Styles.image} 
                />



                <p>{message}</p>
                <button onClick={onClose} className={Styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
