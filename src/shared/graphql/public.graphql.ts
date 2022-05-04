/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Cat {
  id?: Nullable<number>;
  name?: Nullable<string>;
}

export interface IQuery {
  cat(id: string): Nullable<Cat> | Promise<Nullable<Cat>>;
  user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
  id?: Nullable<number>;
  name?: Nullable<string>;
}

type Nullable<T> = T | null;
