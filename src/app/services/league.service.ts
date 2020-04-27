import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, pipe } from 'rxjs';
import { Leagues } from '../models/leagues';
import { tap, map, first, filter, switchMap } from 'rxjs/operators';
import { EventService } from './event.service';
import 'rxjs/add/operator/first';

@Injectable({
    providedIn: 'root'
})
export class LeagueService {

    constructor(private http: HttpClient,
        private eventService: EventService) { }

    getAllLeagues(): Observable<Leagues> {
        return this.http.get<Leagues>("https://www.thesportsdb.com/api/v1/json/1/all_leagues.php")
            .pipe(
                map(elem => {
                    let leagues: Leagues = new Leagues([]);
                    leagues.leagues = elem.leagues.filter(league => league.strSport == "Soccer" && league.strLeague != "_No League");
                    return leagues;
                })
            );
    }
}
