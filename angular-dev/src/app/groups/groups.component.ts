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
                for (var i = 0; i < this.user.groups.length; i++) {
                    this.groupService.getGroupByID(this.user.groups[i]).subscribe(group => {
                        if (group.length == 1) {
                            console.log("pushed: " + group[0]);
                            this.groups.push(group[0]);
                            this.data += group[0] + "\n";
                        }
                    });
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
