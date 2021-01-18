import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { FunkoService } from 'src/app/services/funko.service';
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
        description: ''
    };
    message = '';

    constructor(
        private funkoService: FunkoService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.message = '';
        this.getFunko(this.route.snapshot.params.id);
    }

    getFunko(id: string): void {
        this.funkoService.get(id)
            .subscribe(
                data => {
                    this.currentFunko = data;
                    if (this.currentFunko.userId != this.authService.getUserId()) {
                        this.router.navigate(['/']);
                    }
                },
                error => {
                    console.log(error);
                });
    }

    updateFunko(): void {
        this.funkoService.update(this.currentFunko.id, this.currentFunko)
            .subscribe(
                response => {
                    this.message = response.message;
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                });
    }

    deleteFunko(): void {
        this.funkoService.delete(this.currentFunko.id)
            .subscribe(
                response => {
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                });
    }
}