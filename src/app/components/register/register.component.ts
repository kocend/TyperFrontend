import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public displayRegisterDialog: boolean = true;

    public invalidLogin: boolean = false;

    constructor(private authService: AuthService,
        private router: Router) { }

    ngOnInit(): void {
    }

    public signUp(credentials): void {
        // console.log("credentials");
        // this.authService.login(credentials)
        //     .subscribe(result => {
        //         console.log(result);
        //         if (result){
        //             this.displayRegisterDialog = false;
        //             this.router.navigate(['/tips']);
        //         }
        //         else
        //             this.invalidLogin = true;
        //     });
    }

}
