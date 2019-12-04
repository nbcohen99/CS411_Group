
import { map } from 'rxjs/operators';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(private http: HttpClient) { }


    private databaseUrl: string = "http://54.164.165.203/";
    //returns an observable list of all users in the database
    public getAllGroups(): Observable<Group[]> {
        return this.http.get<Group[]>(this.databaseUrl + "showGroups.php").pipe(
            map(data => data.map(data => new Group().deserialize(data))));
    }

    /*
     * Returns an observable list of all users in the database with a given ID.
     * In almost every case, it will return an empty array if the user isnt found,
     * or it will return an array of size 1 containing the user.
     */
    public getGroupByID(id: string): Observable<Group[]> {

        return this.http.get<Group[]>(this.databaseUrl + "getGroupByID.php", {
            params: {
                "id": id
            }
        }).pipe(
            map(data => data.map(data => new Group().deserialize(data))));
    }

    public createGroup(name: string, ownerID: string): Observable<Group[]> {
        console.log("yeah...")
        return this.http.get<Group[]>(this.databaseUrl + "createGroup.php", {
            params: {
                "name": name,
                "ownerID":ownerID
            }
        }).pipe(
            map(data => data.map(data => new Group().deserialize(data))));
    }
}
