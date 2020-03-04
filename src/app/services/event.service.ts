import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { Events } from '../models/events';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getNext5EventsByTeamId(teamId: number): Observable<Events>{
    return this.http.get<Events>("https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id="+teamId);
  }

  getLast5EventsByTeamId(teamId: number): Observable<Events>{
    return this.http.get<Events>("https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id="+teamId);
  }

  getNext15EventsByLeagueId(leagueId: number): Observable<Events>{
    return this.http.get<Events>("https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id="+leagueId);
  }

  getLast15EventsByLeagueId(leagueId: number): Observable<Events>{
    return this.http.get<Events>("https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id="+leagueId);
  }

  getEventById(eventId: number): Observable<Event[]>{
    return this.http.get<Event[]>(`https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=441613`);
  }

  getAllEventsByLeagueIdAndSeason(leagueId: number, season: number): Observable<Events>{
    return this.http.get<Events>("https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id="+leagueId+"&s="+season);
  }

  getAllEventsByLeagueIdInCurrentSeason(leagueId: number): Observable<Events>{
    return this.http.get<Events>("https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id="+leagueId);
  }
}
