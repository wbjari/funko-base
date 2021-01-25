import { Component, OnInit } from '@angular/core';
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

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if(this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "You are already signed in. Sign out first before you try to create a new account." } };
            this.router.navigate(['/'], navigationExtras);
        }
    }

    signUp(): void {
        const data = {
            username: this.user.username,
            password: this.user.password
        };

        this.authService.signUp(data)
            .subscribe(
                response => {
                    const navigationExtras: NavigationExtras = { state: { successMessage: "Successfully signed up! You can now sign in." } };
                    this.router.navigate(['/'], navigationExtras);
                },
                error => {
                    console.log(error);
                });
    }

}