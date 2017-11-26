import { Action } from '@ngrx/store';
import { UserInterfaceState } from './user-interface';

export const SET_SEARCH = 'SET_SEARCH';
export const FIRST_PAGE = 'FIRST_PAGE';
export const LAST_PAGE = 'LAST_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';

export class SetSearch implements Action {
  readonly type = SET_SEARCH;

  constructor(public payload: { search: string }) {}
}

export class FirstPage implements Action {
  readonly type = FIRST_PAGE;
}

export class LastPage implements Action {
  readonly type = LAST_PAGE;
}

export class NextPage implements Action {
  readonly type = NEXT_PAGE;
}

export class PrevPage implements Action {
  readonly type = PREV_PAGE;
}

export type All = SetSearch |
                  FirstPage |
                  LastPage |
                  NextPage |
                  PrevPage;
