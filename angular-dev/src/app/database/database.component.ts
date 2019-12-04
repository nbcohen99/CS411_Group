import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group.model';
@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
    data: any;

    constructor(
        private userService: UserService,
        private groupService: GroupService) {
        
    }

    ngOnInit() {
    }

    /*
     * Some basic examples on how to use the UserService
     */

    getUsers() {
        //This returns an Observable<User[]> Object that contains all users in database
        //See models/user.model.ts for attributes
        this.userService.getAllUsers().subscribe(users => {
            console.log("List of all users:")
            console.log(<User[]>users)
            console.log("Individual users:")
            var i: number;
            this.data = "";
            for (i = 0; i < users.length; i++){
                console.log(<User>users[i]);
                this.data += "\n\n" + (<User>users[i]);
            }
        });
    }

    getUserByTheID(id: string) {
        console.log("Querying with ID..");
        this.userService.getUserByID(id).subscribe(users => {

            if (users.length == 0) {
                this.data = "No user found"
                return
            }
            if (users.length > 1) {
                this.data = "Database Error: Too many users"
                return
            }

            this.data = <User>users[0];

        });

    }

    getGroups() {
        //This returns an Observable<User[]> Object that contains all users in database
        //See models/user.model.ts for attributes
        this.groupService.getAllGroups().subscribe(groups => {
            console.log("List of all groups:")
            console.log(<Group[]>groups)
            console.log("Individual groups:")
            var i: number;
            this.data = "";
            for (i = 0; i < groups.length; i++) {
                console.log(<Group>groups[i]);
                this.data += "\n\n" + (<Group>groups[i]);
            }
        });
    }

    getGroupByTheID(id: string) {
        console.log("Querying with ID..");
        this.groupService.getGroupByID(id).subscribe(groups => {

            if (groups.length == 0) {
                this.data = "No group found"
                return
            }
            if (groups.length > 1) {
                this.data = "Database Error: Too many groups"
                return
            }

            this.data = <Group>groups[0];

        });

    }


}
