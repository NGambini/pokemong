import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './state/app.reducers';
import { AppEffects } from './state/app.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(AppEffects),
    // allows debugging and time travel
    StoreDevtoolsModule.instrument()
  ]
})
export class CoreModule { }
