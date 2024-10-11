//app/dashboard/imgtext/page.tsx
import Sidebar from '../Sidebar';
// import Content from '../Content';
import TranslatorAi from '@/app/components/translator/TranslatorAi';
import TvContainer from '@/app/components/tveffect/TvContainer';
// import Translator from '@/app/components/translator/Translator';


export default function Imgtext() {
    return (
        <div style={{ display: 'flex', margin: 0, padding: 0 }}>
               <TvContainer>
            <Sidebar />
            {/* <Content> */}
           {/* <Translator></Translator> */}
           <TranslatorAi></TranslatorAi>
            {/* </Content> */}
            </TvContainer>
        </div>
    );
}
