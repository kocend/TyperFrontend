import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    items: MenuItem[];
    @Input() showMiniMenu: boolean = false;
    
    constructor(public authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.items = [
            { label: 'Typuj', icon: 'pi pi-th-large', routerLink: ['/tips'] },
            { label: 'Moje Typy', icon: 'pi pi-list', routerLink: ['/my-tips'] },
            { label: 'Statystyki', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/statistics'] },
            { label: 'Konto', icon: 'pi pi-home', routerLink: ['/account'] },
            { label: 'Pomoc', icon: 'fa fa-fw fa-support' }
        ];
    }

    public logOut(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
