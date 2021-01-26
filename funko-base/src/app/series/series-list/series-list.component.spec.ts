import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { SeriesListComponent } from './series-list.component';

describe('SeriesListComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                SeriesListComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create the series-list.component', () => {
        const fixture = TestBed.createComponent(SeriesListComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
