import { Action } from '@ngrx/store';
import { Type } from './type';

export const GET_TYPE = 'GET_TYPE';
export const ADD_TYPE = 'ADD_TYPE';

export class GetType implements Action {
  readonly type = GET_TYPE;

  constructor(public payload: { url: string }) {}
}

export class AddType implements Action {
  readonly type = ADD_TYPE;

  constructor(public payload: { type: Type }) {}
}

export type All = GetType | AddType;
