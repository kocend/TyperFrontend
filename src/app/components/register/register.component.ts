import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterRequest } from 'src/app/models/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

    public displayRegisterDialog: boolean = true;

    public passwordsEqual: boolean = true;
    public usernameFree: boolean = true;
    public passwordLongEnough: boolean = true;
    public allInputsFilled: boolean = true;

    public username: string;
    public password1: string;
    public password2: string;

    constructor(private authService: AuthService,
                private router: Router,
                private messageService: MessageService) { }

    ngOnInit(): void {}

    public signUp(): void {

        if(this.areAllInputsFilled())
        if(this.arePasswordsEqual())
        if(this.isPasswordLongEnough())
            this.authService.isUsernameFree(this.username)
                .subscribe(result => {
                    if(this.usernameFree = result.isFree){
                        console.log("username is free");
                        let userdata = new RegisterRequest;
                        userdata.username = this.username;
                        userdata.password = this.password1
                        this.authService.register(userdata)
                            .subscribe(result => {
                                    this.displayRegisterDialog = false;
                                    this.router.navigate(['/login']);
                                    this.messageService.add({ severity: 'success', summary: 'Pomyślna Rejestracja', detail: ""});
                            })
                    }
                });
    }

    public resetValidation(){
        console.log("resetting validation ...");
        this.passwordsEqual = true;
        this.usernameFree = true;
        this.passwordLongEnough = true;
        this.allInputsFilled = true;
    }

    private areAllInputsFilled(): boolean {
        console.log("areAllInputsFilled()");
        if(this.username?.trim().length > 0 &&
            this.password1?.trim().length > 0 &&
            this.password2?.trim().length > 0){
                console.log("yes");
                this.allInputsFilled = true;
                return true;
        }
        else{
            console.log("no");
            this.allInputsFilled = false;
            return false;
        }
    }

    private arePasswordsEqual(): boolean {
        console.log("arePasswordsEqual()");
        if(this.password1 === this.password2){
            console.log("equal");
            this.passwordsEqual = true;
            return true;
        }
        else{
            console.log("not equal");
            this.passwordsEqual = false;
            return false;
        }
    }

    private isPasswordLongEnough(): boolean {
        console.log("isPasswordLongEnough()");
        if(this.password1?.trim().length >= 4){
            console.log("yes");
            this.passwordLongEnough = true;
            return true;
        }
        else{
            console.log("no");
            this.passwordLongEnough = false;
            return false;
        }
    }

}
