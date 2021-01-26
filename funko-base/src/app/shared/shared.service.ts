import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
