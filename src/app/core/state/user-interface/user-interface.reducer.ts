import { ActionReducer, Action } from '@ngrx/store';

import * as UserInterfaceActions from './user-interface.actions';
import { UserInterfaceState } from './user-interface';

export function userInterfaceReducer(state = new UserInterfaceState(), action: UserInterfaceActions.All): UserInterfaceState {
  switch (action.type) {
    case UserInterfaceActions.SET_SEARCH:
      return Object.assign({}, state, { searchString: action.payload.search });
    default:
      return state;
  }
}
