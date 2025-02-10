import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MapPageComponent } from './map-page/map-page.component';

export const routes: Routes = [{ path: '', component: MapPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
