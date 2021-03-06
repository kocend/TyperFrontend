import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

    constructor() { }

    items: MenuItem[];

    @Output() screenSizeChanged = new EventEmitter<boolean>();
    public screenSizeBroadEnough: boolean = true;

    ngOnInit() {
        this.items = [
            { label: 'Typuj', icon: 'pi pi-th-large', routerLink: ['/tips'] },
            { label: 'Moje Typy', icon: 'pi pi-list', routerLink: ['/my-tips'] },
            { label: 'Statystyki', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/statistics'] },
            { label: 'Konto', icon: 'pi pi-home', routerLink: ['/account'] },
            { label: 'Pomoc', icon: 'fa fa-fw fa-support' }
        ];
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if(event.target.innerWidth < 572){
            this.screenSizeBroadEnough = false;
            this.screenSizeChanged.emit(true);
        }
        else{
            this.screenSizeBroadEnough = true;
            this.screenSizeChanged.emit(false);
        }
    }

}
