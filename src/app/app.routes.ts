import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cad-scene',
    loadChildren: () => import('./components/cad-scene/cad-scene.routes').then((m) => m.CadSceneRoutes),
  },
  {
    path: 'landing',
    loadChildren: () => import('./components/landing/landing.routes').then((m) => m.LandingRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./components/landing/landing.routes').then((m) => m.LandingRoutes),
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
