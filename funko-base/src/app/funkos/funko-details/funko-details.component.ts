import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { FunkoService } from 'src/app/services/funko.service';
import { SerieService } from 'src/app/services/serie.service';
import { AuthService } from 'src/app/services/auth.service';
import { Funko } from 'src/app/models/funko.model';

@Component({
    selector: 'app-funko-details',
    templateUrl: './funko-details.component.html',
    styleUrls: ['./funko-details.component.css']
})
export class FunkoDetailsComponent implements OnInit {
    currentFunko: Funko = {
        name: '',
        number: 0,
        serieId: '',
        description: ''
    };
    message = '';
    series: any;

    constructor(
        private funkoService: FunkoService,
        private serieService: SerieService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.message = '';
        this.series = '';
        this.getFunko(this.route.snapshot.params.id);
        this.getSeries();
    }

    getFunko(id: string): void {
        this.funkoService.get(id)
            .subscribe(
                data => {
                    this.currentFunko = data;
                    console.log(this.currentFunko);
                    if (this.currentFunko.userId != this.authService.getUserId()) {
                        const navigationExtras: NavigationExtras = { state: { errorMessage: "This funko isn't yours!" } };
                        this.router.navigate(['/'], navigationExtras);
                    }
                },
                error => {
                    console.log(error);
                    const navigationExtras: NavigationExtras = { state: { errorMessage: "This funko doesn't exist or has been deleted." } };
                    this.router.navigate(['/'], navigationExtras);
                });
    }

    getSeries(): void {
        this.serieService.getAllByUser().subscribe(
            data => {
                this.series = data;
            },
            error => {
                console.log(error);
            });
    }

    updateFunko(): void {
        console.log(this.currentFunko);
        this.funkoService.update(this.currentFunko.id, this.currentFunko)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Funko successfuly updated." } };
                    this.router.navigate(['/'], navigationExtras);
                },
                error => {
                    console.log(error);
                });
    }

    deleteFunko(): void {
        this.funkoService.delete(this.currentFunko.id)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Funko successfully deleted." } };
                    this.router.navigate(['/'], navigationExtras);
                },
                error => {
                    console.log(error);
                });
    }
}