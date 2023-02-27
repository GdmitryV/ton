
export const handlerLocalStorage = (key: string, message: string) => {
    if (localStorage.getItem(key) === message) {
        return;
    }

    localStorage.setItem(key, message);
}