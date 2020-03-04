import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { SelectItem } from 'primeng/api/selectitem';
import { LeagueService } from 'src/app/services/league.service';
import { TeamService } from 'src/app/services/team.service';
import { strict } from 'assert';
import { element } from 'protractor';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  //time: Date = new Date();

  events: any = [];
  eventsFiltered: any = [];

  leagues: SelectItem[];
  selectedLeagueId: number;

  teams: SelectItem[];
  selectedTeamId: number;

  rounds: SelectItem[];
  selectedRound: number;

  // period: SelectItem[];
  // selectedPeriod: number;

  constructor(private eventService: EventService,
              private leagueService: LeagueService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.leagues = [
      {label:'Wybierz Ligę', value:null},
    ];

    this.leagueService.getAllLeagues().subscribe(data => {
      data.leagues.forEach(element => {
        if(element.strSport=="Soccer")
          this.leagues.push({label: element.strLeague, value: element.idLeague});
      });
    });

    this.teams = [
      {label:'Wybierz Zespół', value:null},
    ];

    this.rounds =[
      {label: 'Wybierz Kolejkę', value:null}
    ]

    //let date = new Date();
    //console.log(date);

    // this.period = [
    //   {label:'wszystkie mecze w sezonie', value:0},
    //   {label:'15 ostatnich meczy w sezonie', value:1},
    //   {label:'15 kolejnych meczy w sezonie', value:2},
    // ];
  }

  leagueChanged(event){
    if(this.selectedLeagueId!=null){
      console.log("leagueChanged()");

      this.eventService.getAllEventsByLeagueIdInCurrentSeason(this.selectedLeagueId).subscribe(data => {
        this.events = data.events;
        this.eventsFiltered = data.events;
      });
      this.changeAvailableTeams();
      this.changeAvailableRounds();
      //TODO rounds initialization
      //this.changePeriodTypeToLeague();
    }
    else{
      this.eventsFiltered = [];
    }
  }

  teamChanged(event){
    if(this.selectedTeamId!=null){
      console.log("teamChanged()");

      this.eventsFiltered = this.events.filter(event => {
        if(event.idHomeTeam==this.selectedTeamId)
          return true;
        if(event.idAwayTeam==this.selectedTeamId)
          return true
        return false;
      })
      //this.changePeriodTypeToTeam();
    }
    else{
      this.eventsFiltered = this.events;
    }
  }

  roundChanged(event){
    this.eventsFiltered = this.events.filter(element => element.intRound==this.selectedRound);
  }

  // periodChanged(event) {
  //   if (this.selectedLeagueId != null && this.selectedTeamId != null) {
  //     console.log("periodChanged()");
  //     switch (this.selectedPeriod) {
  //       case 0: this.eventService.getAllEventsByLeagueIdInCurrentSeason(this.selectedLeagueId).subscribe(data => { this.events = data.events; this.eventsFiltered = data.events; });
  //         break;
  //       case 1: this.eventService.getLast15EventsByLeagueId(this.selectedLeagueId).subscribe(data => { this.events = data.events; this.eventsFiltered = data.events; });
  //         break;
  //       case 2: this.eventService.getNext15EventsByLeagueId(this.selectedLeagueId).subscribe(data => { this.events = data.events; this.eventsFiltered = data.events; });
  //         break;
  //       case 3: this.eventService.getLast5EventsByTeamId(this.selectedTeamId).subscribe(data => { this.events = data.events; this.eventsFiltered = data.events; });
  //         break;
  //       case 4: this.eventService.getNext5EventsByTeamId(this.selectedTeamId).subscribe(data => { this.events = data.events; this.eventsFiltered = data.events; });
  //         break;
  //     }
  //   }
  // }

  changeAvailableTeams(){
    console.log("changeAvailableTeams()");
    this.teams = [
      {label:'Wybierz Zespół', value:null},
    ];

    this.teamService.getAllTeamsByLeagueId(this.selectedLeagueId).subscribe(data => {
      data.teams.forEach(element => {
        this.teams.push(
          {label: element.strTeam, value: element.idTeam}
        )
      })
    })
  }

  changeAvailableRounds(){
    console.log("changeAvailableTeams()");
    this.rounds = [
      {label:'Wybierz Kolejkę', value:null},
    ];

    this.events.forEach(element => {
      if(!this.rounds.includes({label: element.intRound.toString(), value: element.intRound}))
        this.rounds.push({label: element.intRound.toString(), value: element.intRound});
    });
    console.log(this.rounds);
  }

  // changePeriodTypeToLeague(){
  //   if (this.period.length > 3) {
  //     console.log("changePeriodTypeToLeague()");
  //     this.period.pop();
  //     this.period.pop();
  //     this.selectedPeriod=0;
  //     this.periodChanged(event);
  //   }
  // }

  // changePeriodTypeToTeam(){
  //   if (this.period.length < 4) {
  //     console.log("changePeriodTypeToTeam()");
  //     this.period.push(
  //       { label: '5 ostatnich meczy wybranego zespołu', value: 3 },
  //       { label: '5 kolejnych meczy wybranego zespołu', value: 4 }
  //     );
  //     this.selectedPeriod=0;
  //     this.periodChanged(event);
  //   }
  // }

}
