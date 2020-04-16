import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { SelectItem } from 'primeng/api/selectitem';
import { LeagueService } from 'src/app/services/league.service';
import { TeamService } from 'src/app/services/team.service';
import { Event } from 'src/app/models/event';
import { MessageService } from 'primeng/api';
import { TipService } from 'src/app/services/tip.service';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.css'],
    providers: [MessageService]
})
export class TipsComponent implements OnInit {

    events: any = [];
    eventsFiltered: any = [];

    public cols: any[];

    public availableLeagues: SelectItem[];
    public selectedLeagueId: number;

    public availableTeams: SelectItem[];
    public selectedTeamId: number;

    public availableRounds: SelectItem[];
    public selectedRound: number;

    public displayTipDialog: boolean = false;
    public selectedEvent: Event = null;

    public homeTeamScore: number = null;
    public awayTeamScore: number = null;

    public eventAlreadyTiped = false;

    public isLoading: boolean = false;

    constructor(private eventService: EventService,
        private leagueService: LeagueService,
        private teamService: TeamService,
        private tipService: TipService,
        private messageService: MessageService) { }

    ngOnInit() {
        console.log("ngOnInit()");
        this.availableLeagues = [
            { label: 'Wybierz Ligę', value: null },
        ];

        this.leagueService.getAllLeagues().subscribe(data => {
            data.leagues.forEach(async element => {
                let amountOfEvents;
                await this.eventService.getNext15EventsByLeagueId(element.idLeague)
                    .first()
                    .toPromise()
                    .then(events => {
                        if (events.events != null && events.events.length)
                            amountOfEvents = events.events.length;
                        else
                            amountOfEvents = 0;
                    })
                if (amountOfEvents != 0)
                    this.availableLeagues.push({ label: element.strLeague, value: element.idLeague });
            });
        });

        this.availableTeams = [
            { label: 'Wybierz Zespół', value: null },
        ];

        this.availableRounds = [
            { label: 'Wybierz Kolejkę', value: null }
        ]

        this.cols = [
            { field: 'intRound', header: 'Kolejka' },
            { field: 'strHomeTeam', header: 'Gospodarz' },
            { field: 'strAwayTeam', header: 'Gość' },
            { field: 'dateEvent', header: 'Data' },
            { field: 'strTimeLocal', header: 'Godzina' }
        ];
    }

    public leagueChanged(event): void {
        if (this.selectedLeagueId != null) {

            this.isLoading = true;

            this.eventService.getNext15EventsByLeagueId(this.selectedLeagueId).subscribe(results => {
                this.events = results.events;
                this.eventsFiltered = results.events;
                this.changeAvailableTeams();
                this.resetSelectedTeamID();
                this.changeAvailableRounds();
                this.resetSelectedRound();
                this.isLoading = false;
            });
        }
        else {
            this.events = [];
            this.eventsFiltered = [];
        }
    }

    public teamChanged(event): void {
        if (this.selectedTeamId != null) {
            if (this.events != null) {
                this.eventsFiltered = this.events.filter(event => {
                    if (event.idHomeTeam == this.selectedTeamId ||
                        event.idAwayTeam == this.selectedTeamId)
                        return true
                    else
                        return false;
                })
                this.resetSelectedRound();
            }
        }
        else {
            this.eventsFiltered = this.events;
        }
    }

    public roundChanged(event): void {

        if (this.selectedTeamId != null) {
            this.eventsFiltered = this.events.filter(element => element.intRound == this.selectedRound &&
                (element.idHomeTeam == this.selectedTeamId ||
                    element.idAwayTeam == this.selectedTeamId));
        }
        else {
            if (this.selectedRound != null)
                this.eventsFiltered = this.events.filter(element => element.intRound == this.selectedRound);
            else
                this.eventsFiltered = this.events;
        }
    }

    public changeAvailableTeams(): void {

        this.availableTeams = [
            { label: 'Wybierz Zespół', value: null },
        ];

        this.teamService.getAllTeamsByLeagueId(this.selectedLeagueId).subscribe(data => {
            if (data.teams != null)
                data.teams.forEach(element => {
                    this.availableTeams.push(
                        { label: element.strTeam, value: element.idTeam }
                    )
                })
        })
    }

    public changeAvailableRounds(): void {

        this.availableRounds = [
            { label: 'Wybierz Kolejkę', value: null },
        ];

        let rounds = [];

        this.eventService.getNext15EventsByLeagueId(this.selectedLeagueId).subscribe(data => {
            if (data.events != null)
                data.events.forEach(event => {
                    if (!rounds.includes(event.intRound)) {
                        rounds.push(event.intRound);
                        this.availableRounds.push({ label: event.intRound.toString(), value: event.intRound });
                    }
                })
        })
    }

    public showTipDialog(event: Event): void {
        this.setScoresPreviouslyMarked(event.idEvent);
        this.selectedEvent = event;
        this.displayTipDialog = true;
    }

    public saveTip(): void {
        if (this.homeTeamScore != null &&
            this.awayTeamScore != null &&
            this.homeTeamScore >= 0 &&
            this.awayTeamScore >= 0) {

            if (this.eventAlreadyTiped)
                this.tipService.setTip(this.selectedEvent.idEvent,
                    {
                        tip_id: null,
                        user_id: 1,
                        game_id: this.selectedEvent.idEvent,
                        home_score: this.homeTeamScore,
                        away_score: this.awayTeamScore,
                        user_score: null
                    }).subscribe(() => console.log("successfully updated record!"));
            else
                this.tipService.addTip(
                    {
                        tip_id: null,
                        user_id: 1,
                        game_id: this.selectedEvent.idEvent,
                        home_score: this.homeTeamScore,
                        away_score: this.awayTeamScore,
                        user_score: null
                    }).subscribe(() => console.log("successfully added record!"));

            this.messageService.add({ severity: 'success', summary: 'Zapisano Typ', detail: this.selectedEvent.strEvent + " " + this.homeTeamScore + ":" + this.awayTeamScore });
            this.homeTeamScore = null;
            this.awayTeamScore = null;
            this.displayTipDialog = false;
        }

        this.eventAlreadyTiped = false;
    }

    public cancelTip(): void {
        this.homeTeamScore = null;
        this.awayTeamScore = null;
        this.eventAlreadyTiped = false;
        this.displayTipDialog = false;
    }

    public resetSelectedTeamID(): void {
        this.selectedTeamId = null;
    }

    public resetSelectedRound(): void {
        this.selectedRound = null;
    }

    private setScoresPreviouslyMarked(gameId: number): void {
        this.tipService.getTipByGameId(gameId).subscribe(data => {
            if (data.home_score != null && data.away_score != null)
                this.eventAlreadyTiped = true;
            else
                this.eventAlreadyTiped = false;
            this.homeTeamScore = data.home_score;
            this.awayTeamScore = data.away_score;
        })
    }
}
