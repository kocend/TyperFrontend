import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tip } from '../models/tip';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
    })
}

@Injectable({
    providedIn: 'root'
})
export class TipService {

    url = "http://typer.ddns.net:8081";

    constructor(private http: HttpClient) { }

    public addTip(tip: Tip): Observable<any> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post("http://typer.ddns.net:8081/tips", tip, httpOptions);
    }

    public getAllMyTips(): Observable<Tip[]> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Tip[]>(`http://typer.ddns.net:8081/tips`, httpOptions);
    }

    public getTipByGameId(gameId: number): Observable<Tip> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Tip>(`http://typer.ddns.net:8081/tips/${gameId}`, httpOptions);
    }

    public setTip(gameId: number, tip: Tip): Observable<any> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put(`http://typer.ddns.net:8081/tips/${gameId}`, tip, httpOptions);
    }
}
