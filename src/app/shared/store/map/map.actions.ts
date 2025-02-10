import { createActionGroup, props } from '@ngrx/store';

export const MapActions = createActionGroup({
  source: 'Map',
  events: {
    'Set Map Initizlied': props<{ isMapInitialized: boolean }>(),
    'Set Last Clicked Coordinates': props<{ lat: number; lon: number }>(),
  },
});
