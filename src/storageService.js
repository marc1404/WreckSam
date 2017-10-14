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

    get(key: string): ?Object {
        try {
            const item = localStorage.getItem(key);

            if (!item) {
                return null;
            }

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