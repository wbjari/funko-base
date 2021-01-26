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
        serieId: 0,
        description: ''
    };
    series: Serie[] = [];

    // Init form
    addFunkoForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private funkoService: FunkoService, private serieService: SerieService, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {       
        if (!this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "Unauthorized. Sign in first." } };
            this.router.navigate(['/'], navigationExtras);
        }

        this.addFunkoForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(4)]],
            number: [null, [Validators.required, Validators.min(1)]],
            serie: [null, [Validators.required]],      
            description: [null],      
        });

        this.getSeries();
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

    saveFunko(): void {
        const data = {
            name: this.addFunkoForm.get('name')!.value,
            number: this.addFunkoForm.get('number')!.value,
            serieId: this.addFunkoForm.get('serie')!.value.id,
            description: this.addFunkoForm.get('description')!.value
        };

        console.log(data);

        this.funkoService.create(data)
            .subscribe(
                response => {
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
            serieId: 0,
            description: ''
        };
    }

}