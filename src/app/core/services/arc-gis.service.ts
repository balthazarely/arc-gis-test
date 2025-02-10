import { Injectable } from '@angular/core';

import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

@Injectable({
  providedIn: 'root',
})
export class ArcGisService {
  buildPinFeatureLayer(): __esri.FeatureLayer {
    const featureLayer = new FeatureLayer({
      source: [], // Start with an empty feature collection
      objectIdField: 'ObjectID',
      geometryType: 'point',
      popupTemplate: {
        title: 'Clicked Location',
        content: 'This is a pin that you clicked',
        // content: 'Latitude: {latitude} <br> Longitude: {longitude}',
      },
      fields: [
        { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
        { name: 'latitude', alias: 'Latitude', type: 'double' },
        { name: 'longitude', alias: 'Longitude', type: 'double' },
      ],
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          color: [226, 119, 40],
          size: 16,
          outline: {
            color: [255, 255, 255],
            width: 4,
          },
        },
      } as any,
    });

    return featureLayer;
  }
}
