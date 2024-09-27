// app/@types/qrcode.d.ts
declare module 'qrcode' {
    export function toDataURL(data: string | object): Promise<string>;
    // Define otras funciones y tipos según sea necesario
}
