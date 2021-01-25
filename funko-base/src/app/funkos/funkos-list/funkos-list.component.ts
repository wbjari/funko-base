import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { Funko } from 'src/app/models/funko.model';
import { FunkoService } from 'src/app/services/funko.service';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
    selector: 'app-funkos-list',
    templateUrl: './funkos-list.component.html',
    styleUrls: ['./funkos-list.component.css']
})
export class FunkosListComponent implements OnInit {
    funkos?: Funko[];
    currentFunko?: any;
    currentIndex: number = -1;
    name: string = '';
    canEdit: boolean = false;
    errorMessage: string | undefined;
    successMessage: string | undefined;
    loggedIn: boolean | undefined;
    canLike: boolean = true;
    likedBy: string | undefined;

    constructor(private funkoService: FunkoService, private likeService: LikeService, private authService: AuthService, private router: Router) { 
        const currentNav = this.router.getCurrentNavigation();
        if(currentNav) {
            const errorState = currentNav.extras.state as { errorMessage: string };
            const successState = currentNav.extras.state as { successMessage: string };
            if(errorState) {this.errorMessage = errorState.errorMessage;}
            if(successState) {this.successMessage = successState.successMessage;}
        }
     }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
        this.retrieveFunkos();
    }

    retrieveFunkos(): void {
        this.funkoService.getAll()
            .subscribe(
                data => {
                    this.funkos = data;
                },
                error => {
                    console.log(error);
                });
    }

    refreshList(): void {
        this.retrieveFunkos();
        this.currentFunko = undefined;
        this.currentIndex = -1;
    }

    setActiveFunko(funko: Funko, index: number): void {
        this.currentFunko = funko;
        this.currentIndex = index;

        this.checkOwner();
        this.checkLiked();
        this.setLikedArray(); 
        
    }

    setLikedArray(): void {
        let currentFunkoLikes = this.currentFunko.likes;
        let likedBy = '';

        if (currentFunkoLikes.length > 0 && currentFunkoLikes.length < 3) {
            for (var i = 0; i < currentFunkoLikes.length; i++) {
                if(i == 0) {
                    likedBy = currentFunkoLikes[i].User.username;
                } else {
                    likedBy = likedBy + ', ' + currentFunkoLikes[i].User.username;
                }
            }
            this.likedBy = likedBy + ' liked this.';
        } else if (currentFunkoLikes.length >= 3) {
            for (var i = 0; i < 2; i++) {
                const randomElement = currentFunkoLikes[Math.floor(Math.random() * currentFunkoLikes.length)];
                likedBy = likedBy + ', ' + randomElement.User.username;
            }
            let others = currentFunkoLikes - 2;
            likedBy = likedBy.concat(' and ' + others + ' others liked this.');
            console.log(likedBy);
            this.likedBy = likedBy;
        } else {
            this.likedBy = undefined;
        }
    }

    checkOwner(): void {
        if (this.currentFunko.userId == this.authService.getUserId()) {
            this.canEdit = true;
        } else {
            this.canEdit = false;
        }
    }

    checkLiked(): void {
        let currentFunkoLikes = this.currentFunko.likes;
        if (currentFunkoLikes.length > 0) {
            for (var i = 0; i < currentFunkoLikes.length; i++) {
                if (currentFunkoLikes[i].userId == this.authService.getUserId()) {
                    this.canLike = false;
                } else {
                    this.canLike = true;
                }
            }
        } else {
            this.canLike = true;
        }
    }

    searchName(): void {
        this.funkoService.findByName(this.name)
            .subscribe(
                data => {
                    this.funkos = data;
                },
                error => {
                    console.log(error);
                });
    }

    likeFunko(): void {
        const data = {
            funkoId: this.currentFunko.id
        };

        this.likeService.create(data)
            .subscribe(
                res => {
                    this.canLike = false;
                    this.refreshList();
                },
                error => {
                    console.log(error);
                });
    }

    unlikeFunko(): void {
        this.likeService.delete(this.currentFunko.id)
            .subscribe(
                res => {
                    this.canLike = true;
                    this.refreshList();
                },
                error => {
                    console.log(error);
                });
    }

}