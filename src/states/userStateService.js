// @flow
import UserState from './UserState';

class UserStateService {

    userState: UserState;

    constructor() {
        this.userState = new UserState();
    }

    getUserState(): UserState {
        return this.userState;
    }

}

export default new UserStateService();