import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'
import { Like } from '../models/like.model';

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getAllByFunko(funkoId: any): Observable<Like[]> {
        return this.http.get<Like[]>(`${environment.apiUrl + '/like'}/${funkoId}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(environment.apiUrl + '/like', data, this.auth.jwt());
    }

    delete(funkoId: any): Observable<any> {
        return this.http.delete(`${environment.apiUrl + '/like'}/${funkoId}`, this.auth.jwt());
    }
}