import { Tip } from 'src/app/models/tip';
import { Event } from 'src/app/models/event';

export class UserTip {
    public user_id: number;
    public game_id: number;
    public league_id: number;
    public str_league: string;
    public round: number;
    public event_date: string;
    public event_hour: string;
    public str_home_team: string;
    public str_away_team: string;
    public user_tip_home_score: number;
    public user_tip_away_score: number;
    public home_score: number;
    public away_score: number;
    public user_score: number;

    constructor(tip: Tip, event: Event){
        this.user_id = tip.user_id;
        this.game_id = tip.game_id;
        this.league_id = event.idLeague;
        this.str_league = event.strLeague;
        this.round = event.intRound;
        this.event_date = event.dateEvent;
        this.event_hour = event.strTimeLocal;
        this.user_tip_home_score = tip.home_score;
        this.user_tip_away_score = tip.away_score;
        this.str_home_team = event.strHomeTeam;
        this.str_away_team = event.strAwayTeam;
        this.home_score = event.intHomeScore;
        this.away_score = event.intAwayScore;
        this.user_score = tip.user_score;
    }
}
