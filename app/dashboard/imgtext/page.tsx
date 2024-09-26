import Sidebar from '../Sidebar';
import Content from '../Content';

export default function Imgtext() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Content>
        <h1>Section 1</h1>
        <p>This is content for Section 1.</p>
      </Content>
    </div>
  );
}
