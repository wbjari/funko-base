import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunkosModule } from './funkos/funkos.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', redirectTo: 'funkos', pathMatch: 'full' },
  { path: 'funkos', loadChildren: () => FunkosModule },
  { path: 'auth', loadChildren: () => AuthModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
