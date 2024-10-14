//app/dashboard/imgtext/page.tsx
import SignatureCanvas from '@/app/components/signature/SignaturePad';
import Sidebar from '../Sidebar';
// import Content from '../Content';
import TvContainer from '@/app/components/tveffect/TvContainer';
// import Translator from '@/app/components/translator/Translator';


export default function Signature() {
    return (
        <div style={{ display: 'flex', margin: 0, padding: 0 }}>
               <TvContainer>
            <Sidebar />

           <SignatureCanvas/>

            </TvContainer>
        </div>
    );
}
