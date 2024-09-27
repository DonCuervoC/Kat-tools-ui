// app/page.tsx

'use client'; // Ensure this is a Client Component
import { useState } from 'react';
import Link from 'next/link';
import styles from './Home.module.css'; // Ensure this file exists
import { rubik} from '@/ui/fonts'; // Importa las fuentes

import Image from 'next/image';

const Home = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<'collaborate' | 'anonymous' | null>(null); // State to track active button

  const handleCollaborateClick = () => {
    setFormVisible(true);
    setActiveButton('collaborate'); // Set the active button to "collaborate"
  };

  const handleAnonymousClick = () => {
    setActiveButton('anonymous'); // Set the active button to "anonymous"
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setActiveButton(null); // Reset active button when closing form
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., send data to a backend)
    // After handling, redirect to the dashboard
    window.location.href = '/dashboard'; // Redirects to /dashboard after submission
  };

  return (
    // <div className={styles.container}>
    <div className={`${styles.container} ${rubik.className}`}>
      <div className={styles.backgroundGradient}></div>
      <div>

      <Image
          src="/cats/cat16.png"
          width={110}
          height={170}
          className="hidden md:block"
          alt="Cat logo Arya Iberia PC version"
        />
        <Image
          src="/cats/cat16.png"
          width={100}
          height={110}
          className="block md:hidden"
          alt="Cat logo Arya Iberia mobile version"
        />

      <h1 className={styles.title}>Welcome!</h1>
      </div>
      
      <div className={styles.descriptionContainer}>
               <div className={styles.description}>
          Hello, world! I&apos;m <strong>Nelson Cuervo</strong>, a passionate developer crafting
          applications that blend <strong>backend</strong> and <strong>frontend</strong> skills. I recognized the power of small tools
          to transform our daily lives, so I created this space where you can find various handy applications
          (some might even encourage a little lazy behavior! &#128513;). Despite their modest size, these tools pack
          a punch to simplify your day-to-day tasks.This application is a constant work in progress, and<strong> i&apos;m always open to feedback and constructive ideas. </strong>
          Good vibes all around, and see you out there!
        </div>
      </div>


      {/* Div for separating description and profile links */}
      <div style={{ marginTop: '20px' }}>
        <p>
          Check out my profiles:
          <a
            href="https://www.linkedin.com/in/nelson-cuervo/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a> |
          <a
            href="https://github.com/DonCuervoC"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </p>
      </div>

      <p>Would you like to collaborate and register your visit?</p>
      <button
        onClick={handleCollaborateClick}
        className={`${styles.button} ${activeButton === 'collaborate' ? styles.active : ''}`}
      >
        I want to collaborate
      </button>
      <Link href="/dashboard">
        <button
          onClick={handleAnonymousClick}
          className={`${styles.button} ${activeButton === 'anonymous' ? styles.active : ''}`}
        >
          Enter Anonymously
        </button>
      </Link>

      {/* Modal for collaboration form */}
      {isFormVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={`${styles.close} ${styles.closeButton}`} onClick={handleCloseForm}>&times;</span>
            <h2>Collaboration Form</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="text" placeholder="Company Name" className={styles.input} required />
              <input type="text" placeholder="Your Name" className={styles.input} required />
              <input type="email" placeholder="Email" className={styles.input} required />
              <div className={styles.buttonContainer}>
                <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Submit</button>
                <button type="button" onClick={handleCloseForm} className={`${styles.button} ${styles.submitButton}`}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
