import { Routes } from '@angular/router';
import { MainLayoutComponent } from './presentation/layouts/main-layout/main-layout';
import { MainViewComponent } from './presentation/components/main-view/main-view';
import { AlbumViewComponent } from './presentation/components/album-view/album-view';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainViewComponent
      },
      {
        path: 'album/:id',
        component: AlbumViewComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];