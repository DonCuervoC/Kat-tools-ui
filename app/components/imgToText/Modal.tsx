// app/components/imgToText/Modal.tsx
import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <span className={styles.closeIcon} onClick={onClose}>✖</span> {/* Ícono "X" */}
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
