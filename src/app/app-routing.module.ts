import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) }, { path: 'player', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
