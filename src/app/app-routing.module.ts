import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { PagesAComponent } from './pages-a/pages-a.component';
import { PagesBComponent } from './pages-b/pages-b.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { key: 'keyDashboard' }
  },
  {
    path: 'pages',
    component: PagesComponent,
    data: { key: 'keyPages' },
    children: [
      { path: 'A', component: PagesAComponent, data: { key: 'keyA' } },
      { path: 'B', component: PagesBComponent, data: { key: 'keyB' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
