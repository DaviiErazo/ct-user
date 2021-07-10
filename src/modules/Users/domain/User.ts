import { UserName } from './UserName';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

type Params = {
    name: UserName;
    email: UserEmail;
    password: UserPassword;
}

export class User extends AggregateRoot {
    readonly name: UserName;
    readonly email: UserEmail;
    readonly password: UserPassword;

    constructor(userProps: Params) {
        super();
        this.name = userProps.name;
        this.email = userProps.email;
        this.password = userProps.password;
    }

    static create(userProps: Params): User {
        const user = new User(userProps);

        return user;
    }

    toPrimitives() {
        return {
            name: this.name.value
        }
    }

}