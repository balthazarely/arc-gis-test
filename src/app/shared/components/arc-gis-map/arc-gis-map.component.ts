import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import config from '@arcgis/core/config';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { Store } from '@ngrx/store';
import { MapActions } from '../../store/map/map.actions';
import Locate from '@arcgis/core/widgets/Locate';
import { CoordinatesPanelComponent } from '../../../features/map/components/coordinates-panel/coordinates-panel.component';

@Component({
  selector: 'app-arc-gis-map',
  standalone: true,
  imports: [CoordinatesPanelComponent],
  templateUrl: './arc-gis-map.component.html',
  styleUrl: './arc-gis-map.component.scss',
})
export class ArcGisMapComponent {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  @ViewChild('futureDateDiv', { static: true })
  futureDateRef!: ElementRef<HTMLDivElement>;
  @ViewChild('clearAllPoints', { static: true })
  clearAllPoints!: ElementRef<HTMLDivElement>;

  @Output() mapReady = new EventEmitter();

  @ViewChild('customOverlay')
  customOverlay!: ElementRef<HTMLDivElement>;

  private store = inject(Store);

  @Input() clearAllPointsFn!: () => void;

  esriConfig = config;
  mapView!: MapView;
  spatialReference = SpatialReference.WebMercator;

  async initMap() {
    try {
      this.mapView = this.initialize({
        container: this.mapViewEl.nativeElement,
        basemap: 'dark-gray-vector',
      });
      return await this.mapView.when();
    } catch (error) {
      console.error('Error initializing the map:', error);
      throw error;
    }
  }

  async ngOnInit() {
    try {
      await this.initMap().then(() => {
        this.mapReady.emit();
        this.mapView.ui.add(this.futureDateRef.nativeElement, 'bottom-left');
        this.mapView.ui.add(this.clearAllPoints.nativeElement, 'bottom-right');
        let locateWidget = new Locate({
          view: this.mapView,
        });

        this.mapView.ui.add(locateWidget, 'top-right');

        this.store.dispatch(
          MapActions.setMapInitizlied({ isMapInitialized: true })
        );
      });
    } catch (error) {
      console.error('Error initializing the map:', error);
    }
  }

  initialize(config: {
    container: HTMLDivElement;
    basemap: string;
  }): __esri.MapView {
    const map = new Map({
      basemap: config.basemap,
    });

    const view = new MapView({
      container: config.container,
      map,
      center: [-106.53, 38.79],
      popupEnabled: true,
      zoom: 4,
      popup: {
        dockEnabled: false,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false,
          position: 'top-right',
        },
        visibleElements: {
          closeButton: false,
          collapseButton: false,
          featureNavigation: false,
          heading: false,
          actionBar: false,
        },
      },
      spatialReference: this.spatialReference,
      ui: {
        components: ['zoom'],
      },
    });

    this.mapView = view;

    return this.mapView;
  }

  removeAllLayersFromMap() {
    this.mapView.map.removeAll();
  }

  removeAllThePointsFromMap() {
    this.clearAllPointsFn();
  }

  ngOnDestroy(): void {
    if (this.mapView && this.mapView.initialized) {
      this.mapView.destroy();
    }
  }
}
