import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunkosModule } from './funkos/funkos.module';

const routes: Routes = [
  { path: '', redirectTo: 'funkos', pathMatch: 'full' },
  { path: 'funkos', loadChildren: () => FunkosModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
