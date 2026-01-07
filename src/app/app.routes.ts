import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tickets', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./modules/welcome/welcome.component').then(c => c.WelcomeComponent),
  },
  {
    path: 'companies',
    loadComponent: () => import('./modules/company/company.component').then(c => c.CompanyComponent),
    canActivate: [authGuard]
  },
  {
    path: 'materials',
    loadComponent: () => import('./modules/material/material.component').then(c => c.MaterialComponent),
    canActivate: [authGuard]
  },
  {
    path: 'type-materials',
    loadComponent: () => import('./modules/type-material/type-material.component').then(c => c.TypeMaterialComponent),
    canActivate: [authGuard]
  },
  {
    path: 'mines',
    loadComponent: () => import('./modules/mine/mine.component').then(c => c.MineComponent),
    canActivate: [authGuard]
  },
  {
    path: 'lots',
    loadComponent: () => import('./modules/lot/lot.component').then(c => c.LotComponent),
    canActivate: [authGuard]
  },
  {
    path: 'suppliers',
    loadComponent: () => import('./modules/supplier/supplier.component').then(c => c.SupplierComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cooperatives',
    loadComponent: () => import('./modules/cooperative/cooperative.component').then(c => c.CooperativeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'loads',
    loadComponent: () => import('./modules/load/load.component').then(c => c.LoadComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => import('./shared/components/nout-found/nout-found.component').then(c => c.NoutFoundComponent)
  }
];
