import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SerieService } from './serie.service';

describe('SerieService', () => {
    let serieService: SerieService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                SerieService
            ]
        });

        serieService = TestBed.inject(SerieService);
    });

    it('should be created', () => {
        const serieService: SerieService = TestBed.inject(SerieService);
        expect(serieService).toBeTruthy();
    });
});