import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { Serie } from 'src/app/models/serie.model';
import { SerieService } from 'src/app/services/serie.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-series-list',
    templateUrl: './series-list.component.html',
    styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
    series?: Serie[];
    name: string = '';
    errorMessage: string | undefined;
    successMessage: string | undefined;
    loggedIn: boolean | undefined;

    constructor(private serieService: SerieService, private authService: AuthService, private router: Router) { 
        const currentNav = this.router.getCurrentNavigation();
        if(currentNav) {
            const errorState = currentNav.extras.state as { errorMessage: string };
            const successState = currentNav.extras.state as { successMessage: string };
            if(errorState) {this.errorMessage = errorState.errorMessage;}
            if(successState) {this.successMessage = successState.successMessage;}
        }
     }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
        this.retrieveSeries();
    }

    retrieveSeries(): void {
        this.serieService.getAllByUser()
            .subscribe(
                data => {
                    this.series = data;
                },
                error => {
                    console.log(error);
                });
    }

}