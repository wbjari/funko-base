import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSerieComponent } from './add-serie/add-serie.component'
import { SeriesComponent } from './series.component';

const seriesRoutes: Routes = [
    {
        path: '', component: SeriesComponent, children: [
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
