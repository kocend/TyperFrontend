import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from "@auth0/angular-jwt";
import { RegisterRequest } from '../models/register-request';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public isUsernameFree(username: string): Observable<any> {
        return this.http.post<any>('http://typer.ddns.net:8081/isUsernameFree', username);
    }

    public register(userdata: RegisterRequest): Observable<any> {
        return this.http.post<any>('http://typer.ddns.net:8081/register', userdata);
    }

    public login(credentials): Observable<any> {
        return this.http.post<any>('http://typer.ddns.net:8081/login', credentials)
            .pipe(
                map(response => {

                    console.log(response);
                    let res: HttpResponse<any> = new HttpResponse(response);
                    console.log(res);
                    console.log(response.jwt);
                    if (res.status && response.jwt) {
                        localStorage.setItem('token', response.jwt);
                        return true;
                    }
                    return false;
                })
            );
    }

    public logout(): void {
        localStorage.removeItem('token');
    }

    public isLoggedIn(): boolean {

        let jwtHelper = new JwtHelperService();
        let token = localStorage.getItem('token');

        if(!token)  
            return false;

        let expirationDate = jwtHelper.getTokenExpirationDate(token);
        let isExpired = jwtHelper.isTokenExpired(token);

        return !isExpired;
    }

    get currentUser() {  
        let token = localStorage.getItem('token');  
        if(!token) return null;  
        return new JwtHelperService().decodeToken(token);  
      } 
}
