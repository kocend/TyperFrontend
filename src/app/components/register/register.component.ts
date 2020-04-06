import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterRequest } from 'src/app/models/register-request';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {

    public formGroup: FormGroup;

    public displayRegisterDialog: boolean = true;

    constructor(private authService: AuthService,
                private router: Router,
                private messageService: MessageService,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            username: new FormControl('', Validators.required, this.validUsernameFreedoom(this.authService)),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
            passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4)])
        }, [ this.validPasswordsEquality('password', 'passwordConfirmation')]);
    }

    public signUp(): void {

        let userdata = new RegisterRequest;
        userdata.username = this.usernameFormControl.value;
        userdata.password = this.passwordFormControl.value;
        this.authService.register(userdata)
            .subscribe(result => {
                this.displayRegisterDialog = false;
                this.router.navigate(['/login']);
                this.messageService.add({ severity: 'success', summary: 'Pomyślna Rejestracja', detail: "" });
            })
    }

    private validUsernameFreedoom(authService: AuthService): AsyncValidatorFn {
        return async (c: AbstractControl): Promise<ValidationErrors | null> => {
            const usernameValue = c.value;

            if(usernameValue?.trim() == 0)
                return;

            let isFree: boolean = false;

            await authService.isUsernameFree(usernameValue)
                .toPromise()
                .then(result => {
                    isFree = result.isFree;
            });

            if (isFree)
                return null;
            else
                return new Promise((resolve) => {
                    resolve({ 'notFree': true });
                });
        }
    }

    public validPasswordsEquality(password: string, passwordConformation: string): ValidatorFn {
        return (c: AbstractControl): ValidationErrors | null => {
            const passwordControl = c.get(password);
            const passwordConformationControl = c.get(passwordConformation);

            if (passwordControl == null)
                throw new Error(`Control with name '${password}' not found`);

            if (passwordConformationControl == null)
                throw new Error(`Control with name '${passwordConformation}' not found`);

            const passwordValue = passwordControl.value;
            const passwordConformationValue = passwordConformationControl.value;

            if (passwordValue !== passwordConformationValue)
                return { 'passwordsNotEqual': true };
            else
                return null;
        };
    }

    get usernameFormControl() {
        return this.formGroup.get('username');
    }

    get passwordFormControl() {
        return this.formGroup.get('password');
    }

    get passwordConfirmationFormControl() {
        return this.formGroup.get('passwordConfirmation');
    }
}
