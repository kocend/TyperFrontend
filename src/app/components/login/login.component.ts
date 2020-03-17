import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public displayLoginDialog: boolean = true;

    public invalidLogin: boolean = false;

    constructor(private authService: AuthService,
        private router: Router) { }

    ngOnInit(): void {
    }

    public signIn(credentials): void {
        console.log("credentials");
        this.authService.login(credentials)
            .subscribe(result => {
                console.log(result);
                if (result){
                    this.displayLoginDialog = false;
                    this.router.navigate(['/tips']);
                }
                else
                    this.invalidLogin = true;
            });
    }
}
