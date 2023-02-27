import {base64ToBytes} from "@/shared/lib/utils/base64ToBytes";
import {bytesToHex} from "@/shared/lib/utils/bytesToHex";

export const base64ToHex = (base64: string): string => {
    let bytes = base64ToBytes(base64);
    return bytesToHex(bytes);
}