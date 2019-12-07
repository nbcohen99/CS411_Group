import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Group } from '../models/group.model';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
    private user: User;
    private data: string = "";
    private groups: Group[] = [];
    private users: User[][] = [[]];

    constructor(
        private cookieService: CookieService,
        private groupService: GroupService,
        private userService: UserService,
        private redirect: Router
    ) { }

    ngOnInit() {
        //TODO VALIDATE USER
        var userID = this.cookieService.get("user-id");

        this.userService.getUserByID(userID).subscribe(users => {
            if (users.length != 1) {
                this.redirect.navigate(['/']);
            }

            this.user = (<User>users[0]);

            this.updateGroupList();
        });
    }

    private updateGroup(group) {
        if (group.length == 1) {
            this.groups.push(group[0]);
            var usersForThisGroup = [];
            for (var j = 0; j < group[0].userIDs.length; j++) {
                let user_promise = this.userService.getUserByID(group[0].userIDs[j]).toPromise();
                usersForThisGroup.push(user_promise);
            }

            return Promise.all(usersForThisGroup);
        }
    }

    private __updateGroupList(users) {
        if (users.length != 1) {
            this.redirect.navigate(['/']);
            return;
        }
        this.user = (<User>users[0]);
        this.data = "";
        this.groups = [];
        this.users = [];

        let all_promises = [];

        for (var i = 0; i < this.user.groups.length; i++) {
            let group_promise = this.groupService.getGroupByID(this.user.groups[i]).toPromise();

            let users_promise = new Promise(function (resolve) {
                group_promise.then(function (group) {
                    let usersForThisGroup = this.updateGroup(group);
                    resolve(usersForThisGroup);
                }.bind(this));
            }.bind(this));

            all_promises.push(users_promise);
        }

        Promise.all(all_promises).then(function (all_users) {
            console.log(all_users);

            // Shuck array into simple user-list format
            for (var i = 0; i < all_users.length; i++) {
                if (all_users[i].length === 1) {
                    all_users[i] = all_users[i][0];
                } else {
                    for (var j = 0; j < all_users[i].length; j++) {
                        all_users[i][j] = all_users[i][j][0];
                    }
                }
            }

            this.users = all_users;
        }.bind(this));
    }

    public updateGroupList() {
        var userID = this.cookieService.get("user-id");
        this.userService.getUserByID(userID).toPromise().then(this.__updateGroupList.bind(this));
    }

    public createGroup(groupName: string) {
        this.groupService.createGroup(groupName, this.user.id).subscribe(data => {
            setTimeout(function () {
                this.updateGroupList();
            }.bind(this), 1000);
        });
        setTimeout(function () {
            this.updateGroupList();
        }.bind(this), 1000);
    }

    public leaveGroup(groupID: string) {
        this.userService.leaveGroup(this.user.id, groupID).subscribe(e => {
            this.updateGroupList();
        });

    }
}
