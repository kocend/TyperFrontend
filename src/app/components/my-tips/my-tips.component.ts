import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/app/models/tip';
import { TipService } from 'src/app/services/tip.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { UserTip } from './models/user-tip';

@Component({
    selector: 'app-my-tips',
    templateUrl: './my-tips.component.html',
    styleUrls: ['./my-tips.component.css']
})
export class MyTipsComponent implements OnInit {

    public userTips: UserTip[] = [];
    public cols: any[];

    constructor(private tipService: TipService,
                private eventService: EventService) { }

    ngOnInit() {
        this.tipService.getAllMyTips().subscribe(tips => {
            tips.forEach(tip => {
                this.eventService.getEventById(tip.game_id).subscribe(events => {
                    this.userTips.push(new UserTip(tip, events.events.pop()));
                });
            });
        });

        this.cols = [
            { field: 'str_home_team', header: 'Gospodarz' },
            { field: 'str_away_team', header: 'Gość' },
            { field: 'home_score', header: 'Bramki gospodarzy' },
            { field: 'away_score', header: 'Bramki gości' },
            { field: 'user_tip_home_score', header: 'mój typ Bramki gospodarzy' },
            { field: 'user_tip_away_score', header: 'mój typ Bramki gości' },
            { field: 'user_score', header: 'moje punkty' }
        ];
    }
}
