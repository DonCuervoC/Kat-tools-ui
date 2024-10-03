//app/dashboard/imgtext/page.tsx
import Sidebar from '../Sidebar';
import Content from '../Content';
import ImgtoText from '@/app/components/imgToText/ImgtoText';

export default function Imgtext() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Content>
       <ImgtoText></ImgtoText>
      </Content>
    </div>
  );
}
