// app/dashboard/page.tsx

import Sidebar from './Sidebar';
import Content from './Content';

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flex: '1' }}> {/* Asegura que el sidebar y el contenido usen el espacio disponible */}
      <Sidebar />
      <Content>
        <h1>Dashboard Home</h1>
        <p>Welcome to your customizable dashboard!</p>
      </Content>
    </div>
  );
}
