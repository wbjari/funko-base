import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { SerieDetailsComponent } from './serie-details.component';

describe('SerieDetailsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                SerieDetailsComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create the serie-details.component', () => {
        const fixture = TestBed.createComponent(SerieDetailsComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
