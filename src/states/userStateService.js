// @flow
import UserState from './UserState';
import Raven from 'raven-js';
import storageService from '../storageService';

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
        storageService.set('UserState', this.userState);
        this.updateUserContext();
    }

    load(): ?Object {
        return storageService.get('UserState');
    }

    reset() {
        this.userState.name = null;
        this.userState.age = null;

        storageService.remove('UserState');
        storageService.remove('splash.skippable');
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