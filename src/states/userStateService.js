// @flow
import UserState from './UserState';
import Raven from 'raven';

class UserStateService {

    userState: UserState;

    constructor() {
        const data = this.load();
        const name = data && data.name;
        const age = data && data.age;
        this.userState = new UserState(name, age);

        this.updateUserContext();
    }

    getUserState(): UserState {
        return this.userState;
    }

    hasNameAndAge(): boolean {
        return !!this.userState.name && !!this.userState.age;
    }

    save() {
        localStorage.setItem('UserState', JSON.stringify(this.userState));
        this.updateUserContext();
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

    reset() {
        this.userState.name = null;
        this.userState.age = null;

        localStorage.removeItem('UserState');
    }

    updateUserContext() {
        const { name, age } = this.userState;

        if (name) {
            Raven.setUserContext({
                username: this.userState.name
            });
        }

        if (age) {
            Raven.setExtraContext({
                age: this.userState.age
            });
        }
    }

}

export default new UserStateService();