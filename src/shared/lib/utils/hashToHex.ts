import {base64ToHex} from "@/shared/lib/utils/base64ToHex";

export function hashToHex(base64_or_hex_hash: string): string {
    if (base64_or_hex_hash.length === 44) {
        return base64ToHex(base64_or_hex_hash)
    }

    return base64_or_hex_hash;
}