import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { mapReducer } from './shared/store/map/map.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ map: mapReducer }),
    // provideEffects(TrailEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
