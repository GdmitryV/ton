class LocalStorage {
    private localStorage?:Storage;
    constructor() {
        try {
            this.localStorage = window.localStorage;
        } catch (error) {
            console.error(error);
        }
    }

    get<T>(key: string) {
        if (!this.localStorage) return;

        try {
            const value = this.localStorage.getItem(key);
            if (!value) return;

            return JSON.parse(value) as T;
        } catch (error) {
            console.error(error);
        }
    }

    set(key: string, value: unknown) {
        if (!this.localStorage) return;

        try {
            const stringValue = JSON.stringify(value);

            this.localStorage.setItem(key, stringValue);
        } catch (error) {
            console.error(error);
        }
    }

    remove(key: string) {
        if (!this.localStorage) return;
        this.localStorage.removeItem(key);
    }

    clear() {
        if (!this.localStorage) return;
        this.localStorage.clear();
    }
}

export const localStorage = new LocalStorage();