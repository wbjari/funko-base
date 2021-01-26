import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

import { SerieService } from 'src/app/services/serie.service';
import { AuthService } from 'src/app/services/auth.service';
import { Serie } from 'src/app/models/serie.model';

@Component({
    selector: 'app-serie-details',
    templateUrl: './serie-details.component.html',
    styleUrls: ['./serie-details.component.css']
})
export class SerieDetailsComponent implements OnInit {
    currentSerie: Serie = {
        name: ''
    };
    message = '';

    //Init form
    updateSerieForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
        private serieService: SerieService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.message = '';
        this.getSerie(this.route.snapshot.params.id);

        this.updateSerieForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(4)]]
        });
    }

    getSerie(id: string): void {
        this.serieService.get(id)
            .subscribe(
                data => {
                    this.currentSerie = data;
                    this.updateSerieForm.controls['name'].setValue(this.currentSerie.name);
                    if (this.currentSerie.userId != this.authService.getUserId()) {
                        const navigationExtras: NavigationExtras = { state: { errorMessage: "This serie isn't yours!" } };
                        this.router.navigate(['/series'], navigationExtras);
                    }
                },
                error => {
                    console.log(error);
                    const navigationExtras: NavigationExtras = { state: { errorMessage: "This serie doesn't exist or has been deleted." } };
                    this.router.navigate(['/series'], navigationExtras);
                });
    }

    updateSerie(): void {
        this.currentSerie.name = this.updateSerieForm.get('name')!.value;
        this.serieService.update(this.currentSerie.id, this.currentSerie)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Serie successfully updated." } };
                    this.router.navigate(['/series'], navigationExtras);
                },
                error => {
                    console.log(error);
                });
    }

    deleteSerie(): void {
        this.serieService.delete(this.currentSerie.id)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Serie and it's linked Funko's successfully deleted." } };
                    this.router.navigate(['/series'], navigationExtras);
                },
                error => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Serie and it's linked Funko's successfully deleted." } };
                    this.router.navigate(['/series'], navigationExtras);
                });
    }
}