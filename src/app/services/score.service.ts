import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
    })
}

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    constructor(private http: HttpClient) { }

    public getAllUserScores(): Observable<number> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<number>("http://localhost:8080/scores", httpOptions);
    }

    public getAllUsersAndScores(): Observable<Score[]> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Score[]>("http://localhost:8080/scores/all", httpOptions);
    }

    public getAllUsersAndScoresByLeagueID(leagueID: number): Observable<Score[]> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Score[]>(`http://localhost:8080/scores/leagues/${leagueID}`, httpOptions);
    }

    public getAllUsersAndScoresByTeamID(teamID: number): Observable<Score[]> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Score[]>(`http://localhost:8080/scores/teams/${teamID}`, httpOptions);
    }
}
