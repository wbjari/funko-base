import { Component, OnInit } from '@angular/core';
import { Router, Params, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.component.html'
})
export class SignOutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

    ngOnInit(): void {
        if(!this.authService.isAuthenticated()) {
            const navigationExtras: NavigationExtras = { state: { errorMessage: "You are not signed in, so no need to sign out." } };
            this.router.navigate(['/'], navigationExtras);
        } else {
            this.signOut();
        }
    }

    signOut(): void {
        if (this.authService.isAuthenticated()) {
            this.authService.signOut();
            const navigationExtras: NavigationExtras = { state: { successMessage: "You are now signed out." } };
            this.sharedService.loggedIn.next(false);
            this.router.navigate(['/'], navigationExtras);
        }
    }

}