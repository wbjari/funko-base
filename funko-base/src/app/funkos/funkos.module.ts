import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FunkosComponent } from './funkos.component';
import { FunkosRoutingModule } from './funkos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FunkoService } from '../services/funko.service';
import { FunkoDetailsComponent } from './funko-details/funko-details.component';
import { FunkosListComponent } from './funkos-list/funkos-list.component';
import { AddFunkoComponent } from './add-funko/add-funko.component';

@NgModule({
    declarations: [
        FunkosComponent,
        FunkoDetailsComponent,
        FunkosListComponent,
        AddFunkoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FunkosRoutingModule,
        SharedModule
    ],
    providers: [
        FunkoService
    ]
})
export class FunkosModule { }
