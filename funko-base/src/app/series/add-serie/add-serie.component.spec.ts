import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { AddSerieComponent } from './add-serie.component';

describe('AddSerieComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                AddSerieComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create the add-serie.component', () => {
        const fixture = TestBed.createComponent(AddSerieComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
