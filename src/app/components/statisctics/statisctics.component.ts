import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { SelectItem } from 'primeng/api/selectitem';
import { Score } from 'src/app/models/score';
import { LeagueService } from 'src/app/services/league.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
    selector: 'app-statisctics',
    templateUrl: './statisctics.component.html',
    styleUrls: ['./statisctics.component.css']
})
export class StatiscticsComponent implements OnInit {

    public isLoading: boolean;
    public totalPoints: number;
    public scores: Score[];

    public cols: any[];

    public availableLeagues: SelectItem[];
    public selectedLeagueId: number;

    public availableTeams: SelectItem[];
    public selectedTeamId: number;

    constructor(private scoreService: ScoreService,
                private leagueService: LeagueService,
                private teamService: TeamService) { }

    ngOnInit() {
        this.scores = [];
        this.getUserScore();
        this.prepareAvailableLeagues();
        this.prepareCols();
        this.prepareAvailableTeams();
    }

    public leagueChanged(event): void{
        if (this.selectedLeagueId != null){
            this.scores = null;
            this.getAllUsersAndScoresByLeagueId(this.selectedLeagueId);
            this.changeAvailableTeams();
            this.resetSelectedTeamID();
        }
    }

    public teamChanged(event): void {
        if (this.selectedTeamId != null) {
            this.scores = null;
            this.getAllUsersAndScoresByTeamId(this.selectedTeamId);
        }
    }

    private getAllUsersAndScoresByLeagueId(leagueId: number): void {
        this.scoreService.getAllUsersAndScoresByLeagueID(leagueId).subscribe(scores => {
            this.scores = scores.sort((a, b)=>{
                if(a.points > b.points)
                    return -1;
                else
                    return 1;
            })
        });
    }

    private getAllUsersAndScoresByTeamId(teamId: number): void {
        this.scoreService.getAllUsersAndScoresByTeamID(teamId).subscribe(scores => {
            this.scores = scores.sort((a, b)=>{
                if(a.points > b.points)
                    return -1;
                else
                    return 1;
            })
        });
    }

    private getUserScore(): void {
        this.scoreService.getAllUserScores().subscribe(score => this.totalPoints = score);
    }

    private prepareAvailableLeagues(): void {
        this.availableLeagues = [
            { label: 'Wybierz Ligę', value: null },
        ];

        this.leagueService.getAllLeagues().subscribe(data => {
            data.leagues.forEach(element => {
                if (element.strSport == "Soccer")
                    this.availableLeagues.push({ label: element.strLeague, value: element.idLeague });
            });
        });
    }

    private prepareAvailableTeams(): void {
        this.availableTeams = [
            { label: 'Wybierz Zespół', value: null },
        ];
    }

    private prepareCols(): void {
        this.cols = [
            { field: 'username', header: 'Użytkownik' },
            { field: 'points', header: 'Punkty' }
        ];
    }

    private changeAvailableTeams(): void {
        console.log("changeAvailableTeams()");
        this.availableTeams = [
            { label: 'Wybierz Zespół', value: null },
        ];

        this.teamService.getAllTeamsByLeagueId(this.selectedLeagueId).subscribe(data => {
            data.teams.forEach(element => {
                this.availableTeams.push(
                    { label: element.strTeam, value: element.idTeam }
                )
            })
        })
    }

    private resetSelectedTeamID(): void {
        this.selectedTeamId = null;
    }

}
