import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    private databaseUrl: string = "http://54.164.165.203/";

    sendEmailToUser(userID: string, msg: string) {
        console.log("inHERE");
        this.userService.getUserByID(userID).subscribe(users => {
            if (users.length == 1) {
                console.log("sending...");
                this.http.get(this.databaseUrl + "email.php", {
                    params: {
                        "to": users[0].email,
                        "name": users[0].name,
                        "body": msg
                    }
                }).subscribe(data => {
                    console.log("Get email request done");
                });

            }
        });

    }
}
