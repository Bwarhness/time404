import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    HttpClientModule
  ]
})
export class CatalogModule { }
