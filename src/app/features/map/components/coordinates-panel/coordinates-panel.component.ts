import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMapCoordinates } from '../../../../shared/store/map/map.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordinates-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordinates-panel.component.html',
  styleUrl: './coordinates-panel.component.scss',
})
export class CoordinatesPanelComponent {
  private store = inject(Store);
  clickedCoords$ = this.store.select(selectMapCoordinates);
}
