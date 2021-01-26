import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ReactiveFormsModule
            ],
            declarations: [
                AuthComponent
            ],
            providers: [
                SharedService
            ]
        }).compileComponents();
    });

    it('should create auth.component', () => {
        const fixture = TestBed.createComponent(AuthComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
