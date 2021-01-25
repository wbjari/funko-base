import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSerieComponent } from './add-serie/add-serie.component'
import { SerieDetailsComponent } from './serie-details/serie-details.component'
import { SeriesListComponent } from './series-list/series-list.component'
import { SeriesComponent } from './series.component';

const seriesRoutes: Routes = [
    {
        path: '', component: SeriesComponent, children: [
            { path: '', component: SeriesListComponent },
            { path: 'series/:id', component: SerieDetailsComponent },
            { path: 'add-serie', component: AddSerieComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(seriesRoutes)
    ],
    exports: [RouterModule]
})
export class SeriesRoutingModule { }
