import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { PagesAComponent } from './pages-a/pages-a.component';
import { PagesBComponent } from './pages-b/pages-b.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PagesComponent,
    PagesAComponent,
    PagesBComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
