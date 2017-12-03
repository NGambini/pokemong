import { EntityState } from '@ngrx/entity';
import { typeReducer, initialState } from './type.reducer';
import * as TypeActions from './type.actions';
import { Type } from './type';
import { Dictionary } from '@ngrx/entity/src/models';

describe('TypeReducer', () => {
  const typeStateMock = initialState;

  it('should add type to state', () => {
    const mockedType: Type = {
      averageStats: null,
      id: 1,
      name: 'grass',
      pokemon: []
    };
    const newState = typeReducer(typeStateMock, new TypeActions.AddType({ type: mockedType }));
    expect(newState.entities[1].name).toEqual('grass');
  });

  it('should set average stats for type', () => {
    const attackStat = {
      name: 'attack',
      value: 55
    };
    const mockedType: Type = {
      averageStats: null,
      id: 1,
      name: 'grass',
      pokemon: []
    };
    const typeAddedState = typeReducer(typeStateMock, new TypeActions.AddType({ type: mockedType }));
    const newState = typeReducer(typeAddedState, new TypeActions.SetAverageStats({
      type: {
        id: 1,
        changes: {
          averageStats: [
            attackStat
          ]
        }
      }
    }));
    expect(newState.entities[1].averageStats).toEqual([attackStat]);
  });
});
