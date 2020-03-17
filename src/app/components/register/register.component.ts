import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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

        if( this.username?.trim().length != 0 &&
            this.password1?.trim().length != 0 &&
            this.password2?.trim().length != 0 ){

                if(this.password1 !== this.password2)
                    this.passwordsEqual = false;
                else{

                    this.authService.isUsernameFree(this.username)
                        .subscribe(result => {
                            this.usernameFree = result.isFree;
                            if(this.usernameFree)
                                console.log("username is free");
                                // this.authService.register({ "username": this.username, "password": this.password1 })
                                //     .subscribe(result => {
                                //         if (result){
                                //             this.displayRegisterDialog = false;
                                //             this.router.navigate(['/login']);
                                //             this.messageService.add({ severity: 'success', summary: 'Pomyślna Rejestracja', detail: ""});
                                //         }
                                //     })

                         } );
                    }
            }
    }

}
