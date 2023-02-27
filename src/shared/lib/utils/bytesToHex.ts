export const bytesToHex = (bytes: any) => {
    return Array.from(bytes, (byte:any) => {
        return ('0' + (byte & 0xFF).toString(16).slice(-2));
    }).join('');
}