import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Serie } from 'src/app/models/serie.model';
import { SerieService } from 'src/app/services/serie.service';

@Component({
    selector: 'app-add-serie',
    templateUrl: './add-serie.component.html',
    styleUrls: ['./add-serie.component.css']
})
export class AddSerieComponent implements OnInit {
    serie: Serie = {
        name: ''
    };
    submitted = false;

    //Init form
    public name: any;

    constructor(private serieService: SerieService, private fb: FormBuilder) { }

    ngOnInit(): void {
        
    }

    saveSerie(): void {
        const data = {
            name: this.serie.name
        };

        this.serieService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                    this.submitted = true;
                },
                error => {
                    console.log(error);
                });
    }

    newSerie(): void {
        this.submitted = false;
        this.serie = {
            name: ''
        };
    }

}