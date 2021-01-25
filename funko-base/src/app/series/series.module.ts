import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SeriesComponent } from './series.component';
import { SeriesRoutingModule } from './series-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SerieService } from '../services/serie.service';
import { AddSerieComponent } from './add-serie/add-serie.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';

@NgModule({
    declarations: [
        SeriesComponent,
        AddSerieComponent,
        SeriesListComponent,
        SerieDetailsComponent
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
