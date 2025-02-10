import { createReducer, on } from '@ngrx/store';
import { MapActions } from './map.actions';

export interface MapState {
  isMapInitialized: boolean;
  lat: number | null;
  lon: number | null;
}

export const initialState: MapState = {
  isMapInitialized: false,
  lat: null,
  lon: null,
};

export const mapReducer = createReducer(
  initialState,
  on(MapActions.setMapInitizlied, (state, { isMapInitialized }) => {
    return {
      ...state,
      isMapInitialized,
    };
  }),
  on(MapActions.setLastClickedCoordinates, (state, { lat, lon }) => {
    const latitude = Math.ceil(lat * 1000) / 1000;
    const longitude = Math.ceil(lon * 1000) / 1000;
    return {
      ...state,
      lat: latitude,
      lon: longitude,
    };
  })
);
