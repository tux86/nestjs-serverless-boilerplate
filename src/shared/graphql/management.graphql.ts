/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateCatInput {
  age?: Nullable<number>;
  name?: Nullable<string>;
}

export interface CreateUserInput {
  age?: Nullable<number>;
  name?: Nullable<string>;
}

export interface Cat {
  age?: Nullable<number>;
  id?: Nullable<number>;
  name?: Nullable<string>;
}

export interface IMutation {
  createCat(
    createCatInput?: Nullable<CreateCatInput>,
  ): Nullable<Cat> | Promise<Nullable<Cat>>;
  createUser(
    createUserInput?: Nullable<CreateUserInput>,
  ): Nullable<User> | Promise<Nullable<User>>;
}

export interface IQuery {
  cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;
  cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;
  user(id: string): Nullable<User> | Promise<Nullable<User>>;
  users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface ISubscription {
  catCreated(): Nullable<Cat> | Promise<Nullable<Cat>>;
  userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
  age?: Nullable<number>;
  id?: Nullable<number>;
  name?: Nullable<string>;
}

type Nullable<T> = T | null;
