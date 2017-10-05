// @flow
import UserState from './UserState';

class UserStateService {

    userState: UserState;

    constructor() {
        const data = this.load();
        const name = data && data.name;
        const age = data && data.age;
        this.userState = new UserState(name, age);
    }

    getUserState(): UserState {
        return this.userState;
    }

    hasNameAndAge(): boolean {
        return !!this.userState.name && !!this.userState.age;
    }

    save() {
        localStorage.setItem('UserState', JSON.stringify(this.userState));
    }

    load(): ?Object {
        const item: ?string = localStorage.getItem('UserState');

        if (!item) {
            return null;
        }

        try {
            return JSON.parse(item);
        } catch (error) {
            console.error(error);
        }
    }

}

export default new UserStateService();