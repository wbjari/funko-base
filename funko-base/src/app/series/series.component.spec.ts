import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { SeriesComponent } from './series.component';

describe('SeriesComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                SeriesComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create the series.component', () => {
        const fixture = TestBed.createComponent(SeriesComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
