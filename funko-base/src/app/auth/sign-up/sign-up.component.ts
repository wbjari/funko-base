import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Params, NavigationExtras } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    user: User = {
        username: '',
        password: ''
    };

    errorMessage: string = '';

    //Init form
    signUpForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if(this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "You are already signed in. Sign out first before you try to create a new account." } };
            this.router.navigate(['/'], navigationExtras);
        }

        this.signUpForm = this.formBuilder.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, [Validators.required, Validators.minLength(8)]],
        });
    }

    signUp(): void {
        const data = {
            username: this.signUpForm.get('username')!.value,
            password: this.signUpForm.get('password')!.value
        };

        this.authService.signUp(data)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Successfully signed up! You can now sign in." } };
                    this.router.navigate(['/'], navigationExtras);
                },
                error => {
                    this.errorMessage = error.error.message;
                });
    }

}