import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tip } from '../models/tip';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
}

@Injectable({
  providedIn: 'root'
})
export class TipService {

  constructor(private http: HttpClient) { }

  public addTip(tip: Tip): Observable<any> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post("http://localhost:8080/tips", tip, httpOptions);
  }

  public getTipByGameId(gameId: number): Observable<Tip> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Tip>(`http://localhost:8080/tips/${gameId}`, httpOptions);
  }

  public setTip(gameId: number, tip: Tip): Observable<any> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`http://localhost:8080/tips/${gameId}`, tip, httpOptions);
  }
}
