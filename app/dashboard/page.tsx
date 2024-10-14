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
    <div style={{ display: 'flex', flex: '1' }}> {/* Asegura que el sidebar y el contenido usen el espacio disponible */}
      '
      <TvContainer>
        <Sidebar />
        <Content>

          <div style={{ display: 'block', marginLeft: '100px', marginRight: 'auto', marginTop: '100px' }}>
            {/* <TvEffect timeMs={800}> */}
            {/* <BuildingPage></BuildingPage> */}
            {/* </TvEffect> */}
            <Spinner animation="grow"
              style={{ marginLeft: '90px', marginRight: 'auto', marginTop: '100px', width: '40px', height: '40px' }}
              />
            <Image
              width={130}
              height={170}
              src="/cats/cat33.jpg"
              alt="Cat contact"
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <br></br>
            <p><strong>Welcome</strong> and <strong>enjoy</strong> the tools!</p>

          </div>

        </Content>
      </TvContainer>
    </div>
  );
}
