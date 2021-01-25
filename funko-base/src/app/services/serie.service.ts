import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'
import { Serie } from '../models/serie.model';

@Injectable({
    providedIn: 'root'
})
export class SerieService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getAll(): Observable<Serie[]> {
        return this.http.get<Serie[]>(environment.apiUrl+'/serie');
    }

    getAllByUser(): Observable<Serie[]> {
        return this.http.get<Serie[]>(environment.apiUrl + '/serie/byUser', this.auth.jwt());
    }

    get(id: any): Observable<Serie> {
        return this.http.get(`${environment.apiUrl+'/serie'}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(environment.apiUrl + '/serie', data, this.auth.jwt());
    }

    // update(id: any, data: any): Observable<any> {
    //     return this.http.put(`${environment.apiUrl + '/serie'}/${id}`, data, this.auth.jwt());
    // }

    delete(id: any): Observable<any> {
        return this.http.delete(`${environment.apiUrl + '/serie'}/${id}`, this.auth.jwt());
    }
}