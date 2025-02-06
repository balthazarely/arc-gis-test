import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/map/map.module').then((m) => m.MapModule),
  },
];
