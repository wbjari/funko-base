import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FunkosComponent } from './funkos.component';

describe('FunkosComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [
                FunkosComponent
            ],
        }).compileComponents();
    });

    it('should create the funkos.component', () => {
        const fixture = TestBed.createComponent(FunkosComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
