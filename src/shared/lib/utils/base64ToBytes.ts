import {base64toString} from "@/shared/lib/utils/base64ToString";

export const base64ToBytes = (base64: string):Uint8Array  => {
    const binary_string = base64toString(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}