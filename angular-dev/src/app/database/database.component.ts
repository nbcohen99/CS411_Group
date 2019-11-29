import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
    data: any;

    constructor(private userService: UserService) {
        
    }

    ngOnInit() {
    }

    getUsers() {
        //This returns an Observable<User[]> Object that contains all users in database
        //See models/user.model.ts for attributes
        this.userService.getAllUsers().subscribe(users => {
            console.log("List of all users:")
            console.log(users)
            console.log("Individual users:")
            var i: number;
            this.data = "";
            for (i = 0; i < users.length; i++){
                console.log(users[i]);
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


}
