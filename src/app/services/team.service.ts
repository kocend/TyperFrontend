import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teams } from '../models/teams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllTeamsByLeagueId(leagueId: number): Observable<Teams>{
    return this.http.get<Teams>("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id="+leagueId);
  }
}
