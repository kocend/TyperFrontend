import { Component, OnInit, ViewChild } from '@angular/core';
import { TipService } from 'src/app/services/tip.service';
import { EventService } from 'src/app/services/event.service';
import { UserTip } from './models/user-tip';

@Component({
    selector: 'app-my-tips',
    templateUrl: './my-tips.component.html',
    styleUrls: ['./my-tips.component.css']
})
export class MyTipsComponent implements OnInit {

    @ViewChild('tt') table; 

    public userTips: UserTip[] = [];
    public cols: any[];

    constructor(private tipService: TipService,
                private eventService: EventService) { }

    ngOnInit() {

        this.tipService.getAllMyTips().subscribe(tips => {
            tips.forEach(tip => {
                this.eventService.getEventById(tip.game_id).subscribe(events => {
                    this.userTips.push(new UserTip(tip, events.events.pop()));
                    this.table.reset();
                });
            });
        });

        this.cols = [
            { field: 'str_league', header: 'Liga' },
            { field: 'round', header: 'Kolejka' },
            { field: 'str_home_team', header: 'Gospodarz' },
            { field: 'str_away_team', header: 'Gość' },
            { field: 'event_date', header: 'Data' },
            { field: 'event_hour', header: 'Godzina' }
        ];
    }
}
