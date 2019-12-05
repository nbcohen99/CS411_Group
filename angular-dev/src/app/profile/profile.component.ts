import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private fullName: String;
    private friends: number;
    private groups: number;
    private user: User;
    constructor(
        private userService: UserService,
        private cookieService: CookieService,
        private redirect: Router
        ) { }

    ngOnInit() {



        var cookie = this.cookieService.get("user-id");
        this.userService.getUserByID(cookie).subscribe(users => {
            if (users.length != 1) {
                console.log("UserID not found");
                this.redirect.navigate(['/']);
            }
            else {
                this.user = users[0];
                this.fullName = this.user.name;
                this.friends = this.user.friends.length;
                this.groups = this.user.groups.length;

            }
        });


    }

}