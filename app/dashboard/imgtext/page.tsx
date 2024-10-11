//app/dashboard/imgtext/page.tsx
import Sidebar from '../Sidebar';
// import Content from '../Content';
import ImgtoText from '@/app/components/imgToText/ImgtoText';
import TvContainer from '@/app/components/tveffect/TvContainer';

export default function Imgtext() {
  return (
    <div style={{ display: 'flex' }}>
      <TvContainer>
        <Sidebar />
        {/* <Content> */}
       <ImgtoText></ImgtoText>
      {/* </Content> */}
      </TvContainer>
    </div>
  );
}
