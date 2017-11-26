import { ActionReducer, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TypeActions from './type.actions';
import { Type } from './type';

export const adapter: EntityAdapter<Type> = createEntityAdapter<Type>();
export const initialState: EntityState<Type> = adapter.getInitialState();

export function typeReducer(state = initialState, action: TypeActions.All): EntityState<Type> {
  switch (action.type) {
    case TypeActions.ADD_TYPE:
      return adapter.addOne(action.payload.type, state);
    default:
      return state;
  }
}
