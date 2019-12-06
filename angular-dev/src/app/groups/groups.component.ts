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

    private updateGroup(i, group) {
        if (group.length == 1) {
            //console.log("pushed: " + group[0]);
            this.groups.push(group[0]);
            var usersForThisGroup = [];
            //console.log(i, 'before usersForThisGroup', usersForThisGroup);
            for (var j = 0; j < group[0].userIDs.length; j++) {
                this.userService.getUserByID(group[0].userIDs[j]).subscribe(function (users2) {
                    //console.log('>>>>>>>>>>', this);
                    if (users2.length == 1) {
                        //console.log("found user belonging to group " + i + " name: " + users2[0].name);
                        usersForThisGroup.push(users2[0]);
                        //console.log(i, 'usersForThisGroup', usersForThisGroup);
                    }
                });
            }
            //console.log(i, 'after usersForThisGroup', usersForThisGroup);
            console.log('=========this.users.length', this.users.length, i);
            //console.log('', this.users);
            this.users.push(usersForThisGroup);
            //console.log('', this.users);
        }
    }

    public updateGroupList() {
        var userID = this.cookieService.get("user-id");
        this.userService.getUserByID(userID).subscribe(users => {
            if (users.length != 1) {
                this.redirect.navigate(['/']);
                return;
            }
            this.user = (<User>users[0]);
            this.data = "";
            this.groups = [];
            this.users = [];

            for (var i = 0; i < this.user.groups.length; i++) {
                this.groupService.getGroupByID(this.user.groups[i]).subscribe(this.updateGroup.bind(this, i));
            }

        });
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
