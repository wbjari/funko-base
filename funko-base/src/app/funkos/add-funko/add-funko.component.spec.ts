import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddFunkoComponent } from './add-funko.component';

describe('AddFunkoComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                AddFunkoComponent
            ],
        }).compileComponents();
    });

    it('should create the add-funko.component', () => {
        const fixture = TestBed.createComponent(AddFunkoComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
