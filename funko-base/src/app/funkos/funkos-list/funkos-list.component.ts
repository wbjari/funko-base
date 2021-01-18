import { Component, OnInit } from '@angular/core';
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

    constructor(private funkoService: FunkoService, private authService: AuthService) { }

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