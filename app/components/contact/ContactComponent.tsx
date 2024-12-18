"use client";
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Styles from './ContactComponent.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import CommentForm from './CommentForm';

export default function ContactComponent() {
    return (
        <div>
            {/* <div style={{ display: 'block', marginLeft: '120%', marginRight: 'auto', marginTop: '100px' }}>
                <p>nelson nelson nelson</p>
            </div> */}
            <div className={Styles.container}>
                {/* <h1 className={Styles.Title}><strong>Contact Page</strong></h1> */}
                {/* <Accordion defaultActiveKey="0" flush className={Styles.accordionItemContainer}> */}
                <Accordion defaultActiveKey="0" flush className={Styles.accordionItemContainer}>

                    <Accordion.Item eventKey="0" >
                        <Accordion.Header
                        ><strong>Contact information</strong></Accordion.Header>
                        <Accordion.Body>

                            <Image
                                width={130}
                                height={170}
                                src="/cats/cat40.png"
                                alt="Cat contact"
                                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                            />

                            <div className={Styles.socialLinks}>

                                <a href="https://www.linkedin.com/in/nelson-cuervo" target="_blank" rel="noopener noreferrer">
                                    <i className="bi bi-linkedin"></i> LinkedIn
                                </a>
                                <a href="https://github.com/DonCuervoC" target="_blank" rel="noopener noreferrer">
                                    <i className="bi bi-github"></i> GitHub
                                </a>
                                <a href="mailto:nelson.cuervo89@gmail.com">
                                    <i className="bi bi-envelope"></i> Email
                                </a>

                                <a href="https://nc-website-ochre.vercel.app">
                                    <i className="bi bi-laptop"></i> Website
                                </a>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1" className={Styles.accordionItem}>
                        <Accordion.Header><strong>Leave your comment</strong></Accordion.Header>
                        <Accordion.Body>
                            <CommentForm />
                        </Accordion.Body>
                    </Accordion.Item>
                    
                </Accordion>
            </div>
        </div>
    );
}
