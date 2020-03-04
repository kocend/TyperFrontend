import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leagues } from '../models/leagues';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  getAllLeagues(): Observable<Leagues>{
    return this.http.get<Leagues>("https://www.thesportsdb.com/api/v1/json/1/all_leagues.php");
  }
}
