import { Component, OnInit } from '@angular/core';
import { Router, Params, NavigationExtras } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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
    submitted = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if(this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "You are already signed in." } };
            this.router.navigate(['/'], navigationExtras);
        } else { }
    }

    signIn(): void {
        const data = {
            username: this.user.username,
            password: this.user.password
        };

        this.authService.signIn(data)
            .subscribe(
                response => {
                    this.submitted = true;
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Successfully signed in!" } };
                    this.router.navigate(['/'], navigationExtras);
                },
                error => {
                    console.log(error);
                });
    }

}