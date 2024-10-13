// import { Container, Spinner } from 'react-bootstrap'
// import Image from 'next/image';
// import React from 'react'
// // import TvEffect from './tveffect/TvEffect';

// export default function BuildingPage() {
//     return (
//         <Container fluid className="d-flex flex-column align-items-center justify-content vh-100">
//             {/* <TvEffect timeMs={400}> */}
//             <Spinner animation="grow" />
//             <br></br>
//             <Image
//                 width={100}
//                 height={140}
//                 src="/cats/cat39.jpg"
//                 alt="Working in progress CAT"
//             />
//             <br></br>
//             <h2>Cat work in progress...</h2>
//             {/* </TvEffect> */}
//         </Container>

//     )
// }

import { Container, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import React from 'react';

export default function BuildingPage() {
    return (
        <Container 
            fluid 
            className="d-flex flex-column align-items-center vh-100" 
            style={{ marginTop: '80px', padding: '0 80px' }} 
        >
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%' 
            }}>
                <Spinner 
                    animation="grow" 
                    style={{ marginBottom: '10px', width: '40px', height: '40px' }} 
                />
                <Image
                    width={100}
                    height={140}
                    src="/cats/cat39.jpg"
                    alt="Working in progress CAT"
                    style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} // Ajusta la imagen
                />
                <h2 style={{ textAlign: 'center' }}>A cat is working about it...</h2>
            </div>
        </Container>
    );
}

