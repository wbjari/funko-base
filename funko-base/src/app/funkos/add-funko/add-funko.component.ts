import { Component, OnInit } from '@angular/core';
import { Funko } from 'src/app/models/funko.model';
import { FunkoService } from 'src/app/services/funko.service';

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
    submitted = false;

    constructor(private funkoService: FunkoService) { }

    ngOnInit(): void {
    }

    saveFunko(): void {
        const data = {
            name: this.funko.name,
            number: this.funko.number,
            description: this.funko.description
        };

        this.funkoService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                    this.submitted = true;
                },
                error => {
                    console.log(error);
                });
    }

    newFunko(): void {
        this.submitted = false;
        this.funko = {
            name: '',
            number: 0,
            description: ''
        };
    }

}