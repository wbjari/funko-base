import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private responseToken = '';
    statChanged = new BehaviorSubject<string>(this.responseToken);
    statChanges = this.statChanged.asObservable();

    constructor(private http: HttpClient) { }

    signIn(data: any): Observable<boolean> {
        return this.http.post(environment.apiUrl+'/auth/signin', data)
            .pipe(map((res: any) => {
                
                // Login successful if there's a jwt token in the response.
                this.responseToken = res.accessToken;
                if(this.responseToken) {
                    this.setToken(this.responseToken);

                    // Return true to indicate successful login.
                    this.statChanged.next(this.responseToken);
                    return true;
                } else {
                    // Return false to indicate failed login.
                    return false;
                }

            }));
    }

    public isAuthenticated(): boolean {
        if (this.getToken()) {
            const expiresAt = this.getTokenExpirationDate(this.getToken());
            return new Date().getTime() < expiresAt.getTime();
        } else {
            return false;
        }

    }

    public getUserId(): string {
        if (this.getToken()) {
            const decoded:any = jwt_decode(this.getToken());
            if (decoded.userId === undefined) {
                return 'No userId.';
            }
            return decoded.userId;
        }
        return 'No token.';
    }

    public jwt() {
        const token = { access_token: this.getToken() };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.access_token
            })
        };
        console.log(httpOptions.headers.getAll('Authorization'))
        return httpOptions;
    }

    private setToken(token: string) {
        localStorage.setItem('jwt_token', token);
    }

    private getToken(): string {
        return localStorage.getItem('jwt_token') || '{}';
    }

    private getTokenExpirationDate(token: string): Date  {
        const decoded:any = jwt_decode(token);

        if (decoded.iat === undefined) {
            return new Date(0);
        }

        const date = new Date();
        date.setUTCSeconds(decoded.iat);
        return date;
    }

    public logout(): void {
        localStorage.removeItem('jwt_token');
        this.statChanged.next('');
        this.responseToken = '';

    }
}