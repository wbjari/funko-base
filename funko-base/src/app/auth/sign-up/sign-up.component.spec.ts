import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                SignUpComponent
            ]
        }).compileComponents();
    });

    it('should create the sign-up.component', () => {
        const fixture = TestBed.createComponent(SignUpComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
