// app/dashboard/page.tsx

import Sidebar from './Sidebar';
import Content from './Content';
// import BuildingPage from '../components/BuildingPage';
import TvContainer from '../components/tveffect/TvContainer';
// import TvEffect from '../components/tveffect/TvEffect';
import Image from 'next/image';
import { Spinner } from 'react-bootstrap';


export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flex: '1', position: 'relative' }}> {/* Asegura que el sidebar y el contenido usen el espacio disponible */}
      <TvContainer>
        <Sidebar />
        <Content>
          <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh', 
              width: '100%', // Ocupa todo el ancho disponible
              textAlign: 'center', // Centra el texto
              position: 'absolute', // Centrado absoluto
              left: '50%', // Desplaza el contenedor al centro de la pantalla
              top: '50%',
              transform: 'translate(-50%, -60%)' // Ajusta para centrarlo perfectamente
          }}>
            <Spinner 
              animation="grow"
              style={{ width: '40px', height: '40px', marginBottom: '20px' }}
            />
            <Image
              width={130}
              height={170}
              src="/cats/cat33.jpg"
              alt="Cat contact"
              style={{ marginBottom: '20px' }}
            />
            <p><strong>Welcome</strong> and <strong>enjoy</strong> the tools!</p>
          </div>
        </Content>
      </TvContainer>
    </div>
  );
}
