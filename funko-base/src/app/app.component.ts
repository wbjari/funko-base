import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Router, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'funko-base';

  user: User | undefined;
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.loggedIn = true; 
    } else {
      this.loggedIn = false;
    }

  }
}
