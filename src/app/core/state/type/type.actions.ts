import { Action } from '@ngrx/store';
import { Type } from './type';

export const GET_TYPE = 'GET_TYPE';
export const ADD_TYPE = 'ADD_TYPE';
export const CALCULATE_AVERAGE_STATS = 'CALC_AVERAGE_STATS';
export const SET_AVERAGE_STATS = 'SET_AVERAGE_STATS';

export class GetType implements Action {
  readonly type = GET_TYPE;

  constructor(public payload: { url: string }) {}
}

export class AddType implements Action {
  readonly type = ADD_TYPE;

  constructor(public payload: { type: Type }) {}
}

export class CalculateAverageStats implements Action {
  readonly type = CALCULATE_AVERAGE_STATS;

  constructor(public payload: { typeId: number, typeName: string }) {}
}

export class SetAverageStats implements Action {
  readonly type = SET_AVERAGE_STATS;

  constructor(public payload: { typeId, stats: Array<number> }) {}
}

export type All = GetType | AddType | CalculateAverageStats | SetAverageStats;
