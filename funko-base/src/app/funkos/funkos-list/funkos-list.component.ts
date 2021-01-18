import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { Funko } from 'src/app/models/funko.model';
import { FunkoService } from 'src/app/services/funko.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-funkos-list',
    templateUrl: './funkos-list.component.html',
    styleUrls: ['./funkos-list.component.css']
})
export class FunkosListComponent implements OnInit {
    funkos?: Funko[];
    currentFunko?: Funko;
    currentIndex = -1;
    name = '';
    canEdit = false;
    errorMessage:string | undefined;
    successMessage:string | undefined;

    constructor(private funkoService: FunkoService, private authService: AuthService, private router: Router) { 
        const currentNav = this.router.getCurrentNavigation();
        if(currentNav) {
            const errorState = currentNav.extras.state as { errorMessage: string };
            const successState = currentNav.extras.state as { successMessage: string };
            if(errorState) {this.errorMessage = errorState.errorMessage;}
            if(successState) {this.successMessage = successState.successMessage;}
        }
     }

    ngOnInit(): void {
        this.retrieveFunkos();
    }

    retrieveFunkos(): void {
        this.funkoService.getAll()
            .subscribe(
                data => {
                    this.funkos = data;
                },
                error => {
                    console.log(error);
                });
    }

    refreshList(): void {
        this.retrieveFunkos();
        this.currentFunko = undefined;
        this.currentIndex = -1;
    }

    setActiveFunko(funko: Funko, index: number): void {
        this.currentFunko = funko;
        this.currentIndex = index;

        if(this.currentFunko.userId == this.authService.getUserId()) {
            this.canEdit = true;
        } else {
            this.canEdit = false;
        }
    }

    searchName(): void {
        this.funkoService.findByName(this.name)
            .subscribe(
                data => {
                    this.funkos = data;
                },
                error => {
                    console.log(error);
                });
    }

}