// @flow

class StorageService {

    set(key: string, value: mixed): boolean {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
            return false;
        }

        return true;
    }

    get(key: string): ?string {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    parse(key: string): ?Object {
        const item = this.get(key);

        if (!item) {
            return null;
        }

        try {
            return JSON.parse(item);
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    remove(key: string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    }

}

export default new StorageService();