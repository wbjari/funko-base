import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FunkoDetailsComponent } from './funko-details.component';

describe('FunkoDetailsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                FunkoDetailsComponent
            ],
        }).compileComponents();
    });

    it('should create the funko-details.component', () => {
        const fixture = TestBed.createComponent(FunkoDetailsComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
