import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public toString(): string {
        return "";
    }
    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>("https://54.164.165.203/showUsers.php").pipe(
            map(data => data.map(data => new User().deserialize(data))));
    }

    public getUserByID(id: string): Observable<User[]> {
        return this.http.get<User[]>("https://54.164.165.203/getUserByID.php", {
            params: {
                "id": id
            }
        }).pipe(
            map(data => data.map(data => new User().deserialize(data))));
    }

    public makeNewUser(user: SocialUser) {
        console.log("Creating new user w/ this data..");
        console.log(user);
        this.http.get("https://54.164.165.203/createUser.php", {
            params: {
                "id": user.id,
                "name": user.name,
                "token": user.idToken,
                "email": user.email
            }
        }).subscribe((data: any) => {
            console.log(data);
        } )
    }
}
