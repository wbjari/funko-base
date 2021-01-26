import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Params, NavigationExtras } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    user: User = {
        username: '',
        password: ''
    };

    errorMessage: string = '';

    //Init form
    signInForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private sharedService: SharedService) { }

    ngOnInit(): void {
        if(this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "You are already signed in." } };
            this.router.navigate(['/'], navigationExtras);
        }

        this.signInForm = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
        });
    }

    signIn(): void {
        const data = {
            username: this.signInForm.get('username')!.value,
            password: this.signInForm.get('password')!.value
        };

        this.authService.signIn(data)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Successfully signed in!" } };
                    this.sharedService.loggedIn.next(true);
                    this.router.navigate(['/'], navigationExtras);
                },
                error => {;
                    this.errorMessage = error.error.message;
                });
    }

}