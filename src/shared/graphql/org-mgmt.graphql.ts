/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
  age?: Nullable<number>;
  name?: Nullable<string>;
}

export abstract class IMutation {
  abstract createUser(
    createUserInput?: Nullable<CreateUserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

  abstract users():
    | Nullable<Nullable<User>[]>
    | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class ISubscription {
  abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
  age?: Nullable<number>;
  id?: Nullable<number>;
  name?: Nullable<string>;
}

type Nullable<T> = T | null;
