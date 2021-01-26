import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { SignOutComponent } from './sign-out.component';

describe('SignOutComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [
                SignOutComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create the sign-out.component', () => {
        const fixture = TestBed.createComponent(SignOutComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
