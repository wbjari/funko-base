import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SeriesComponent } from './series.component';
import { SeriesRoutingModule } from './series-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SerieService } from '../services/serie.service';
import { AddSerieComponent } from './add-serie/add-serie.component';

@NgModule({
    declarations: [
        SeriesComponent,
        AddSerieComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SeriesRoutingModule,
        SharedModule
    ],
    providers: [
        SerieService
    ]
})
export class SeriesModule { }
