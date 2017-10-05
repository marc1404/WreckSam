// @flow

export default class UserState {

    name: ?string;
    age: ?number;

    constructor(name: ?string = null, age: ?number = null) {
        this.name = name;
        this.age = age;
    }

}