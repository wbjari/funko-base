import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FunkoService } from './funko.service';
import { Funko } from '../models/funko.model'
import { environment } from '../../environments/environment'
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';

describe('FunkoService', () => {
    let funkoService: FunkoService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                FunkoService
            ]
        });

        funkoService = TestBed.inject(FunkoService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });
    
    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        const funkoService: FunkoService = TestBed.inject(FunkoService);
        expect(funkoService).toBeTruthy();
    });

    it('should get funkos', () => {
        const dummyFunkos: Funko[] = [{
            id: 1,
            name: 'Spiderman',
            number: 362,
            description: "A man but also a spider.",
            userId: 1,
            serieId: 1
        }, {
            id: 2,
            name: 'Superman',
            number: 219,
            description: "A man, who can fly.",
            userId: 1,
            serieId: 2
        }];

        funkoService.getAll().subscribe(funkos => {
            expect(funkos.length).toBe(2);
            expect(funkos).toEqual(dummyFunkos);
        });

        const req = httpMock.expectOne(environment.apiUrl + '/funko');
        expect(req.request.method).toBe('GET');
        req.flush(dummyFunkos);
    });

    it('should post funko', () => {
        const newFunko: Funko = {
            name: 'Spiderman',
            number: 362,
            description: "A man but also a spider."
        }

        // Push new funko to .create() method in FunkoService
        funkoService.create(newFunko).subscribe(
            data => expect(data).toEqual(newFunko, 'should return the funko'),
            fail
        );

        // .create() should have made one request to POST funko
        const req = httpMock.expectOne(environment.apiUrl + '/funko');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newFunko);

        // Expect server to return the funko after POST
        const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newFunko });
        req.event(expectedResponse);     
    });

    it('should get funko', () => {
        funkoService.get(1).subscribe((data: any) => {
            expect(data.name).toBe('Spiderman');
        });

        const req = httpMock.expectOne(
            environment.apiUrl + '/funko/1',
            'call to api'
        );
        expect(req.request.method).toBe('GET');

        req.flush({
            name: 'Spiderman'
        });

        httpMock.verify();
    });

    it('should put the correct data', () => {
        funkoService.update
            (3, { name: 'Batman' }).subscribe((data: any) => {
                expect(data.name).toBe('Batman');
            });

        const req = httpMock.expectOne(
            environment.apiUrl + '/funko/3',
            'put to api'
        );
        expect(req.request.method).toBe('PUT');

        req.flush({
            name: 'Batman'
        });
    });

    it('should delete funko', () => {
        funkoService.delete(3).subscribe((data: any) => {
            expect(data).toBe(3);
        });

        const req = httpMock.expectOne(
            environment.apiUrl + '/funko/3',
            'delete to api'
        );
        expect(req.request.method).toBe('DELETE');

        req.flush(3);
    });

});