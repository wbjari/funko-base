import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { FunkoService } from 'src/app/services/funko.service';
import { Funko } from 'src/app/models/funko.model';

@Component({
    selector: 'app-funko-details',
    templateUrl: './funko-details.component.html',
    styleUrls: ['./funko-details.component.css']
})
export class FunkoDetailsComponent implements OnInit {
    currentFunko: Funko = {
        title: '',
        description: '',
        published: false
    };
    message = '';

    constructor(
        private funkoService: FunkoService,
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
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }

    updatePublished(status: boolean): void {
        const data = {
            title: this.currentFunko.title,
            description: this.currentFunko.description,
            published: status
        };

        this.funkoService.update(this.currentFunko.id, data)
            .subscribe(
                response => {
                    this.currentFunko.published = status;
                    console.log(response);
                    this.message = response.message;
                },
                error => {
                    console.log(error);
                });
    }

    updateFunko(): void {
        this.funkoService.update(this.currentFunko.id, this.currentFunko)
            .subscribe(
                response => {
                    console.log(response);
                    this.message = response.message;
                },
                error => {
                    console.log(error);
                });
    }

    deleteFunko(): void {
        this.funkoService.delete(this.currentFunko.id)
            .subscribe(
                response => {
                    console.log(response);
                    this.router.navigate(['/funkos']);
                },
                error => {
                    console.log(error);
                });
    }
}