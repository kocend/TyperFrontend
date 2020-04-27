import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public authService: AuthService,
        private router: Router) { }

    ngOnInit() {

        const navToggler = document.getElementById('navbarToggler');
        console.log(navToggler);
        navToggler.addEventListener('collapse', function () {
            console.log("toggled");
        })
    }

    public logOut(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
