//app/dashboard/imgtext/page.tsx
import Sidebar from '../Sidebar';
import Content from '../Content';
import Translator from '@/app/components/translator/Translator';




export default function Imgtext() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Content>
           <Translator></Translator>
            </Content>
        </div>
    );
}
