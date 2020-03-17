import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'Moje Typy', icon: 'pi pi-th-large', routerLink: ['/tips']},
          {label: 'Statystyki', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/statistics']},
          {label: 'Konto', icon: 'pi pi-home', routerLink: ['/account']},
          {label: 'Pomoc', icon: 'fa fa-fw fa-support'},
          {label: 'Media', icon: 'fa fa-fw fa-twitter'}
      ];
  }

}