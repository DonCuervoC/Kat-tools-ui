import Sidebar from '../Sidebar';
import Content from '../Content';

export default function Qrcode() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Content>
        <h1>Section 2</h1>
        <p>This is content for Section 2.</p>
      </Content>
    </div>
  );
}
