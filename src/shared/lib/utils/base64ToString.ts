export const base64toString = (base64: string): string => {
    return atob(base64);
}