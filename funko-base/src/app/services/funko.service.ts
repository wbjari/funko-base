import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'
import { Funko } from '../models/funko.model';

@Injectable({
    providedIn: 'root'
})
export class FunkoService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getAll(): Observable<Funko[]> {
        return this.http.get<Funko[]>(environment.apiUrl+'/funko');
    }

    get(id: any): Observable<Funko> {
        return this.http.get(`${environment.apiUrl+'/funko'}/${id}`);
    }

    create(data: any): Observable<any> {
        console.log(this.auth.jwt());
        return this.http.post(environment.apiUrl + '/funko', data, this.auth.jwt());
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${environment.apiUrl+'/funko'}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${environment.apiUrl+'/funko'}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(environment.apiUrl+'/funko');
    }

    findByName(name: any): Observable<Funko[]> {
        return this.http.get<Funko[]>(`${environment.apiUrl+'/funko'}?name=${name}`);
    }
}