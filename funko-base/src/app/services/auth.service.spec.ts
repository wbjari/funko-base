import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService
            ]
        });

        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        const authService: AuthService = TestBed.inject(AuthService);
        expect(authService).toBeTruthy();
    });
});