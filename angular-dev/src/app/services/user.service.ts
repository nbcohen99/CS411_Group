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

    /*
     * Quick List of Methods:
     * 
     * getAllUsers()
     * getUserByID(id:string)
     * makeNewUser(user:SocialUser)
     * updateToken(userID:string, token:string)
     * addFriend(userID:string, friendID:string)
     * removeFriend(userID:string, friendID:string)
     * joinGroup(userID:string, groupID:string)
     * leaveGroup(userID:string, groupID:string)
     */


    private databaseUrl: String = "http://54.164.165.203/";
    //returns an observable list of all users in the database
    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.databaseUrl+"showUsers.php").pipe(
            map(data => data.map(data => new User().deserialize(data))));
    }

    /*
     * Returns an observable list of all users in the database with a given ID.
     * In almost every case, it will return an empty array if the user isnt found,
     * or it will return an array of size 1 containing the user.
     */
    public getUserByID(id: string): Observable<User[]> {
        return this.http.get<User[]>(this.databaseUrl +"getUserByID.php", {
            params: {
                "id": id
            }
        }).pipe(
            map(data => data.map(data => new User().deserialize(data))));
    }

    /*
     * Creates a new user in the database given Google's SocialUser object
     */
    public makeNewUser(user: SocialUser) {

        //TODO: Verify SocialUser data isnt garbage

        this.http.get(this.databaseUrl +"createUser.php", {
            params: {
                "id": user.id,
                "name": user.name,
                "token": user.idToken,
                "email": user.email
            }
        });
    }

    /*
     * Update's a user's token given a user ID and token 
     */
    public updateToken(userID: string, token: string) {

        //TODO: Verify userID and friendID before sending to backend

        function f(result: { ok: boolean, msg: string }) {
            console.log("UpdateToken Function on UID " + userID + " w/ + " + token + " completed:");
            console.log(result);
        }
        this.http.get(this.databaseUrl +"updateToken.php", {
            params: {
                "id": userID,
                "token": token
            }
        }).subscribe(f.bind(this), f.bind(this));
    }

    /*
     * Adds a friend to a user, given the user's ID and the friend-to-be-added's ID
     * > If the userID is invalid, nothing happens.
     * > If fID is invalid, it will still be added.
     */
    public addFriend(userID: string, friendID: string) {

        //TODO: Verify userID and friendID before sending to backend

        this.http.get(this.databaseUrl +"addFriend.php", {
            params: {
                "uid": userID,
                "fid": friendID
            }
        });
    }

    /*
     * Removes a friend from a user, given the user's ID and the friend-to-be-removed's ID
     * > If the userID or friendID isnt in the user's friendslist, nothing happens.
     */
    public removeFriend(userID: string, friendID: string) {

        //TODO: Verify userID and friendID before sending to backend

        this.http.get(this.databaseUrl +"removeFriend.php", {
            params: {
                "uid": userID,
                "fid": friendID
            }
        });
    }

    /*
     * Adds group to user's grouplist, given user's ID and group-to-join's ID
     * > If the userID is invalid, nothing happens.
     * > If the groupID is invalid, it will still be joined.
     */
    public joinGroup(userID: string, groupID: string) {

        //TODO: Verify userID and friendID before sending to backend

        this.http.get(this.databaseUrl +"joinGroup.php", {
            params: {
                "uid": userID,
                "gid": groupID
            }
        });
    }

     /*
     * Removes a group from a user, given the user's ID and the group-to-leave's ID
     * > If the userID is invalid, or groupID isnt in the user's grouplist, nothing happens.
     */
    public leaveGroup(userID: string, groupID: string) {

        //TODO: Verify userID and friendID before sending to backend

        this.http.get(this.databaseUrl +"leaveGroup.php", {
            params: {
                "uid": userID,
                "gid": groupID
            }
        });
    }

}
