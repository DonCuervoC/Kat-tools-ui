declare module 'qrcode.react' {
    import { Component } from 'react';

    interface QRCodeProps {
        value: string;
        size?: number;
        level?: 'L' | 'M' | 'Q' | 'H'; // Niveles de corrección de errores
        includeMargin?: boolean;
        style?: React.CSSProperties;
        className?: string;
    }

    export default class QRCode extends Component<QRCodeProps> {}
}
