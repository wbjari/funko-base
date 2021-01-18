import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
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
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                });
    }

}