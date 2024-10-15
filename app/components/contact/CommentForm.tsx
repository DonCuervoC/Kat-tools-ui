// app/components/CommentForm.tsx
"use client";

import React, { useState } from 'react';
import Styles from './CommentForm.module.css';
import Popup from '../Popup';
// import Popup from './Popup'; // Asegúrate de que la ruta sea correcta

const CommentForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Estado para el popup

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validar campos obligatorios
    if (!userName || !userEmail || !subject || !comment) {
      setError('All fields are required.');
      return;
    }

    // Preparar los datos a enviar
    const data = {
      userName,
      userEmail,
      subject,
      comment,
    };

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error sending the comment.');
      }

      setSuccessMessage('Comment sent successfully.');
      setShowPopup(true); // Mostrar el popup
      resetForm();
    } catch (err) {
      console.error(err);
      setError('An error occurred while sending the comment.');
    }
  };

  const resetForm = () => {
    setUserName('');
    setUserEmail('');
    setSubject('');
    setComment('');
    setError('');
    setSuccessMessage('');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <div className={Styles.container}>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <h2 style={{fontSize:"150%"}}><strong>Leave your Comment</strong></h2>
        {error && <p className={Styles.error}>{error}</p>}
        {successMessage && <p className={Styles.success}>{successMessage}</p>}

        <div className={Styles.formGroup}>
          <label htmlFor="userName" className={Styles.label}>Name:</label>
          <input
            type="text"
            id="userName"
            className={Styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="userEmail" className={Styles.label}>Email:</label>
          <input
            type="email"
            id="userEmail"
            className={Styles.input}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="subject" className={Styles.label}>Subject:</label>
          <input
            type="text"
            id="subject"
            className={Styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="comment" className={Styles.label}>Comment:</label>
          <textarea
            id="comment"
            className={Styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={Styles.submitButton}>
          Send Comment
        </button>
        <button type="button" onClick={resetForm} className={Styles.resetButton}>
          Reset
        </button>
      </form>
      </div>

      {showPopup && (
        <Popup message="Thank you for your comments!" onClose={closePopup} />
      )}
    </>
  );
};

export default CommentForm;
