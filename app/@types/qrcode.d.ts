// @types/qrcode.d.ts
declare module 'qrcode' {
    export function toDataURL(value: string, options?: any): Promise<string>;
}
