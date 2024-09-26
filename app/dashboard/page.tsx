import Sidebar from './Sidebar';
import Content from './Content';

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}> 
      <Sidebar />
      <Content>
        <h1>Dashboard Home</h1>
        <p>Welcome to your customizable dashboard!</p>
      </Content>
    </div>
  );
}
