import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'funko-base';

  user: User | undefined;
  loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    if(this.auth.isAuthenticated()) {
      this.loggedIn = true; 
    }

  }

  signOut() {
    if(this.auth.isAuthenticated()) {
      this.auth.signOut();
      this.loggedIn = false;
      this.router.navigate(['/']);
    }
  }
}
