'use client'; // Si necesitas que sea un componente del lado del cliente
import { useState } from 'react';
import styles from './HomeComponent.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const HomeVisitorsComponent = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [activeButton, setActiveButton] = useState<'collaborate' | 'anonymous' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar carga

  const handleCollaborateClick = () => {
    setFormVisible(true);
    setActiveButton('collaborate');
  };

  const handleAnonymousClick = () => {
    setActiveButton('anonymous');
    handleSubmitAnonymous(); // Llama directamente aquí
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setActiveButton(null);
    setErrorMessage('');
    setFormData({ companyName: '', name: '', email: '' }); // Resetea el formulario
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(activeButton === 'collaborate' ? 'registered' : 'anonymous');
  };

  const handleSubmitAnonymous = async () => {
    await submitForm('anonymous');
  };

  const submitForm = async (type: 'registered' | 'anonymous') => {
    setLoading(true); // Activa el estado de carga
    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type }),
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className={`${styles.container}`}>
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
          a punch to simplify your day-to-day tasks. This application is a constant work in progress, and
          <strong> I&apos;m always open to feedback and constructive ideas. </strong>
          Good vibes all around, and see you out there!
        </div>
      </div>

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
      <button
        onClick={handleAnonymousClick}
        className={`${styles.button} ${activeButton === 'anonymous' ? styles.active : ''}`}
        disabled={loading} // Desactiva si está cargando
      >
        {loading ? 'Loading...' : 'Enter Anonymously'}
      </button>

      {isFormVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={`${styles.close} ${styles.closeButton}`} onClick={handleCloseForm}>&times;</span>
            <h2>Collaboration Form</h2>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className={styles.input}
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={styles.input}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className={styles.buttonContainer}>
                <button type="submit" className={`${styles.button} ${styles.submitButton}`} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={handleCloseForm} className={`${styles.button} ${styles.submitButton}`}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeVisitorsComponent;
