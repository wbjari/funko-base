import { Component, OnInit } from '@angular/core';
import { Funko } from 'src/app/models/funko.model';
import { FunkoService } from 'src/app/services/funko.service';

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

    constructor(private funkoService: FunkoService) { }

    ngOnInit(): void {
        this.retrieveFunkos();
    }

    retrieveFunkos(): void {
        this.funkoService.getAll()
            .subscribe(
                data => {
                    this.funkos = data;
                    console.log(data);
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
    }

    removeAllFunkos(): void {
        this.funkoService.deleteAll()
            .subscribe(
                response => {
                    console.log(response);
                    this.refreshList();
                },
                error => {
                    console.log(error);
                });
    }

    searchName(): void {
        this.funkoService.findByName(this.name)
            .subscribe(
                data => {
                    this.funkos = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }

}