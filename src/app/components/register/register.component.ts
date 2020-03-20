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

    public invalidRegister: boolean = false;
    public passwordsEqual: boolean = true;
    public usernameFree: boolean = true;

    public username: string;
    public password1: string;
    public password2: string;

    constructor(private authService: AuthService,
                private router: Router,
                private messageService: MessageService) { }

    ngOnInit(): void {}

    public signUp(): void {

        if(this.areInputsNoBlank()){

                if(!this.arePasswordsEqual())
                    this.passwordsEqual = false;
                else{
                    this.passwordsEqual = true;
                    this.authService.isUsernameFree(this.username)
                        .subscribe(result => {
                            this.usernameFree = result.isFree;
                            if(this.usernameFree){
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

                         } );
                    }
            }
    }

    public areInputsNoBlank(): boolean {
        if(this.username?.trim().length != 0 &&
            this.password1?.trim().length != 0 &&
            this.password2?.trim().length != 0)
            return true;
        else 
            return false
    }

    public arePasswordsEqual(): boolean {
        if(this.password1 === this.password2)
            return true;
        else
            return false;
    }

}
