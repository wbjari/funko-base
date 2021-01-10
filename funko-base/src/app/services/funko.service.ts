import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funko } from '../models/funko.model';

const baseUrl = 'http://localhost:8080/api/funkos';

@Injectable({
    providedIn: 'root'
})
export class FunkoService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Funko[]> {
        return this.http.get<Funko[]>(baseUrl);
    }

    get(id: any): Observable<Funko> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByTitle(title: any): Observable<Funko[]> {
        return this.http.get<Funko[]>(`${baseUrl}?title=${title}`);
    }
}