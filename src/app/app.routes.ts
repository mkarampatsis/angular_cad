import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cad-scene',
    loadChildren: () => import('./components/cad-scene/cad-scene.routes').then((m) => m.CadSceneRoutes),
  },
  {
    path: 'than-cad',
    loadChildren: () => import('./components/than-cad/than-cad.routes').then((m) => m.ThanCadRoutes),
  },
  {
    path: 'three-cad',
    loadChildren: () => import('./components/three-cad/three-cad.routes').then((m) => m.ThreeCadRoutes),
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
