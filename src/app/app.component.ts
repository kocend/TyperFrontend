import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'TyperOnline';
    
    public showMiniMenu: boolean = false;

    public screenSizeChanged(event: boolean): void {
        this.showMiniMenu = event;
    }
}
