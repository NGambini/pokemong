import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { pokemonReducer as pokemons } from './pokemon/pokemon.reducer';
import { typeReducer as types } from './type/type.reducer';
import { userInterfaceReducer as uiState } from './user-interface/user-interface.reducer';

import { AppState } from './app.state';

import * as CryptoJS from 'crypto-js';

class Encrypter {
  static readonly key = 's3cret';

  static encrypt(message: string) {
    const secret = CryptoJS.AES.encrypt(message, Encrypter.key);
    return secret.toString();
  }

  static decrypt(message: string) {
    let decoded = CryptoJS.AES.decrypt(message, Encrypter.key);
    decoded = decoded.toString(CryptoJS.enc.Utf8);

    return decoded;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  pokemons,
  types,
  uiState
};

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({
    keys: [
      { pokemons: { encrypt: Encrypter.encrypt, decrypt: Encrypter.decrypt } },
      { types: { encrypt: Encrypter.encrypt, decrypt: Encrypter.decrypt } }
      ],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
