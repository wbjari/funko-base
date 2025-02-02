import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Serie } from 'src/app/models/serie.model';
import { SerieService } from 'src/app/services/serie.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-add-serie',
    templateUrl: './add-serie.component.html',
    styleUrls: ['./add-serie.component.css']
})
export class AddSerieComponent implements OnInit {
    serie: Serie = {
        name: ''
    };

    //Init form
    addSerieForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private serieService: SerieService, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (!this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "Unauthorized. Sign in first." } };
            this.router.navigate(['/'], navigationExtras);
        }

        this.addSerieForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(4)]]
        });
    }

    saveSerie(): void {
        const data = {
            name: this.addSerieForm.get('name')!.value
        };

        this.serieService.create(data)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Serie successfuly created." } };
                    this.router.navigate(['/series'], navigationExtras);
                },
                error => {
                    console.log(error);
                });
    }

    newSerie(): void {
        this.serie = {
            name: ''
        };
    }

}