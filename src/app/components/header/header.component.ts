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
    
    constructor(public authService: AuthService,
                private router: Router) { }

    ngOnInit() {}

    public logOut(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
