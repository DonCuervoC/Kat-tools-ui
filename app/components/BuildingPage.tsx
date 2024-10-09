import { Container, Spinner } from 'react-bootstrap'
import Image from 'next/image';
import React from 'react'

export default function BuildingPage() {
    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content vh-100">
            <Spinner animation="grow" />
            <br></br>
            <Image
                width={100}
                height={140}
                src="/cats/cat39.jpg"
                alt="Working in progress CAT"
            />
            <br></br>
            <h2>Cat work in progress...</h2>
        </Container>
    )
}
