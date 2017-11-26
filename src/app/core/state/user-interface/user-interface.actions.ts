import { Action } from '@ngrx/store';
import { UserInterfaceState } from './user-interface';

export const SET_SEARCH = 'SET_SEARCH';

export class SetSearch implements Action {
  readonly type = SET_SEARCH;

  constructor(public payload: { search: string }) {}
}

export type All = SetSearch;
