import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Funko } from 'src/app/models/funko.model';
import { Serie } from 'src/app/models/serie.model';
import { FunkoService } from 'src/app/services/funko.service';
import { SerieService } from 'src/app/services/serie.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-add-funko',
    templateUrl: './add-funko.component.html',
    styleUrls: ['./add-funko.component.css']
})
export class AddFunkoComponent implements OnInit {
    funko: Funko = {
        name: '',
        number: 0,
        description: ''
    };
    series: Serie[] = [];

    //Init form
    public name: any;
    public number: any;
    public serie: any;
    public description: any;

    constructor(private funkoService: FunkoService, private serieService: SerieService, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (!this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "Unauthorized. Sign in first." } };
            this.router.navigate(['/'], navigationExtras);
        }
        this.getSeries();
    }

    getSeries(): void {
        this.serieService.getAllByUser().subscribe(
            data => {
                this.series = data;
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }

    saveFunko(): void {
        const data = {
            name: this.funko.name,
            number: this.funko.number,
            serieId: this.serie.id,
            description: this.funko.description
        };

        this.funkoService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                    if (this.authService.isAuthenticated()) {
                        const navigationExtras: NavigationExtras = { state: { successMessage: "Funko successfully created!" } };
                        this.router.navigate(['/'], navigationExtras);
                    }
                },
                error => {
                    console.log(error);
                });
    }

    newFunko(): void {
        this.funko = {
            name: '',
            number: 0,
            serieId: '',
            description: ''
        };
    }

}