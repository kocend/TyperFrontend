import { Tip } from 'src/app/models/tip';
import { Event } from 'src/app/models/event';

export class UserTip {
    public user_id: number;
    public game_id: number;
    public league_id: number;
    public round: number;
    public user_tip_home_score: number;
    public user_tip_away_score: number;
    public str_home_team: string;
    public str_away_team: string;
    public home_score: number;
    public away_score: number;
    public user_score: number;

    constructor(tip: Tip, event: Event){
        this.user_id = tip.user_id;
        this.game_id = tip.game_id;
        this.league_id = event.idLeague;
        this.round = event.intRound;
        this.user_tip_home_score = tip.home_score;
        this.user_tip_away_score = tip.away_score;
        this.str_home_team = event.strHomeTeam;
        this.str_away_team = event.strAwayTeam;
        this.home_score = event.intHomeScore;
        this.away_score = event.intAwayScore;
        this.user_score = tip.user_score;
    }
}
