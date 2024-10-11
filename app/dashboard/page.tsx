// app/dashboard/page.tsx

import Sidebar from './Sidebar';
import Content from './Content';
import BuildingPage from '../components/BuildingPage';
// import TvEffect from '../components/tveffect/TvEffect';


export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flex: '1' }}> {/* Asegura que el sidebar y el contenido usen el espacio disponible */}
      <Sidebar />
      <Content>

        <div>
          {/* <TvEffect timeMs={800}> */}
          <BuildingPage></BuildingPage>
          {/* </TvEffect> */}
        </div>

      </Content>
    </div>
  );
}
