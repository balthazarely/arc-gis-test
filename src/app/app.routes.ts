import { Routes } from '@angular/router';
import { BrowserNotificationComponent } from './features/browser-notification/browser-notification.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'notifications',
    component: BrowserNotificationComponent,
  },
];
