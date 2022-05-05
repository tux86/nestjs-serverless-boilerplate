/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Cat {
  name?: Nullable<string>;
}

export abstract class IQuery {
  abstract cats():
    | Nullable<Nullable<Cat>[]>
    | Promise<Nullable<Nullable<Cat>[]>>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
  id?: Nullable<number>;
  name?: Nullable<string>;
}

type Nullable<T> = T | null;
