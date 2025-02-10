import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.reducer';

export const selectMapState = createFeatureSelector<MapState>('map');

// export const selectIsMapInitialized = createSelector(
//   selectMapState,
//   (state: MapState) => ({
//     isMapInitialized: state.isMapInitialized,
//   })
// );

export const selectIsMapInitialized = createSelector(
  selectMapState,
  (state: MapState) => state.isMapInitialized
);

export const selectMapCoordinates = createSelector(
  selectMapState,
  (state: MapState) => ({
    lat: state.lat,
    lon: state.lon,
  })
);
