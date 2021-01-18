import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunkosListComponent } from './funkos-list/funkos-list.component';
import { FunkoDetailsComponent } from './funko-details/funko-details.component';
import { AddFunkoComponent } from './add-funko/add-funko.component'
import { FunkosComponent } from './funkos.component';

const funkosRoutes: Routes = [
    {
        path: '', component: FunkosComponent, children: [
            { path: '', component: FunkosListComponent },
            { path: 'funkos/:id', component: FunkoDetailsComponent },
            { path: 'add-funko', component: AddFunkoComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(funkosRoutes)
    ],
    exports: [RouterModule]
})
export class FunkosRoutingModule { }
