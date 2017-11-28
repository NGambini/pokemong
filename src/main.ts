import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {SerializeKeysTo, DeserializeKeysFrom, UnderscoreCase} from 'cerialize';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


// api is underscore_case, front is camelCase
SerializeKeysTo(UnderscoreCase);
DeserializeKeysFrom(UnderscoreCase);
