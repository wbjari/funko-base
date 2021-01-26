import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                SignInComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create the sign-in.component', () => {
        const fixture = TestBed.createComponent(SignInComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
