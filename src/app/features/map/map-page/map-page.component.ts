import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { ArcGisMapComponent } from '../../../shared/components/arc-gis-map/arc-gis-map.component';
import { filter } from 'rxjs';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import { Store } from '@ngrx/store';
import { selectIsMapInitialized } from '../../../shared/store/map/map.selector';
import { MapActions } from '../../../shared/store/map/map.actions';
import { ArcGisService } from '../../../core/services/arc-gis.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [ArcGisMapComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {
  @Output() mapReady = new EventEmitter<void>();
  @ViewChild(ArcGisMapComponent, { static: true })
  mapComponent!: ArcGisMapComponent;

  private store = inject(Store);
  private arcGisService = inject(ArcGisService);

  async onMapReady() {
    try {
      this.mapReady.emit();
    } catch (error) {
      console.error('Error in onMapReady:', error);
    }
  }

  private pinFeatureLayer!: __esri.FeatureLayer;

  ngOnInit() {
    this.store
      .select(selectIsMapInitialized)
      .pipe(filter((isMapInitialized) => isMapInitialized))
      .subscribe(() => {
        this.initalizeClickHandlers();
        this.moveViewPortLatLon(29.76, -95.37);

        this.pinFeatureLayer = this.arcGisService.buildPinFeatureLayer();
        this.mapComponent.mapView.map.add(this.pinFeatureLayer);
      });
  }

  moveViewPortLatLon(latitude: number, longitude: number, zoom: number = 10) {
    const newCenter = new Point({
      latitude: latitude,
      longitude: longitude,
    });

    this.mapComponent.mapView.goTo({
      target: newCenter,
      zoom,
    });
  }

  initalizeClickHandlers() {
    this.mapComponent?.mapView?.on('click', (event) => {
      const mapPoint = event.mapPoint;
      const markerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],
        size: 12,
      };

      const graphic = new Graphic({
        geometry: new Point({
          longitude: mapPoint.longitude,
          latitude: mapPoint.latitude,
          spatialReference: this.mapComponent.mapView.spatialReference,
        }),
        symbol: markerSymbol,
      });

      this.pinFeatureLayer.applyEdits({ addFeatures: [graphic] });

      this.store.dispatch(
        MapActions.setLastClickedCoordinates({
          lat: mapPoint.latitude,
          lon: mapPoint.longitude,
        })
      );
    });
  }

  clearAllPoints = async () => {
    try {
      const query = this.pinFeatureLayer.createQuery();
      query.where = '1=1';
      const result = await this.pinFeatureLayer.queryFeatures(query);

      if (result.features.length === 0) {
        console.log('No features to remove');
        return;
      }
      await this.pinFeatureLayer.applyEdits({
        deleteFeatures: result.features,
      });
    } catch (error) {
      console.error('Error in clearAllPoints:', error);
    }
  };
}
