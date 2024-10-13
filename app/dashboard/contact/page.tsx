// // app/dashboard/page.tsx

import TvContainer from "@/app/components/tveffect/TvContainer";
import Sidebar from "../Sidebar";
import Content from "../Content";
import ContactComponent from "@/app/components/contact/ContactComponent";
// import BuildingPage from "@/app/components/BuildingPage";

export default function ContactPage() {
    return (
        <div style={{ display: 'flex', flex: '1' }}> {/* Asegura que el sidebar y el contenido usen el espacio disponible */}
            '
            <TvContainer>
                <Sidebar />
                <Content>

                    <div>
                        {/* <TvEffect timeMs={800}> */}
                        {/* <BuildingPage></BuildingPage> */}
                        <ContactComponent/>
                        {/* </TvEffect> */}
                    </div>

                </Content>
            </TvContainer>
        </div>
    );
}
