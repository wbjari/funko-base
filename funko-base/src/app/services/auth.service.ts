import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject, Subject} from 'rxjs';
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

                    // Return true to indicate successful sign in.
                    this.statChanged.next(this.responseToken);
                    return true;
                } else {
                    // Return false to indicate failed sign in.
                    return false;
                }

            }));
    }

    public isAuthenticated(): boolean {
        if (this.getToken() != '{}' || undefined) {
            const expiresAt = this.getTokenExpirationDate(this.getToken());
            return new Date().getTime() < expiresAt.getTime();
        } else {
            return false;
        }

    }

    public getUserId(): any {
        if (this.getToken()) {
            const decoded:any = jwt_decode(this.getToken());
            if (decoded.id === undefined) {
                return false;
            }
            return decoded.id;
        }
        return false;
    }

    public jwt() {
        const token = { access_token: this.getToken() };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token.access_token
            })
        };
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

    public signOut(): void {
        localStorage.removeItem('jwt_token');
        this.statChanged.next('');
        this.responseToken = '';
    }
}