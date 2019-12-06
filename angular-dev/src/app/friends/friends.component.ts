import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private user: User;
  private data: string = "";
  private groups: Group[] = [];
  private users: User[] = [];

  texthtml = "<p>Searching for potential friends...</p>";

  constructor(
    private cookieService: CookieService,
    private groupService: GroupService,
    private userService: UserService,
    private redirect: Router
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      console.log("List of all users:")
      console.log(<User[]>users)
      console.log("Individual users:")
      var i: number;
      this.data = "";
      this.users = users;
      for (i = 0; i < users.length; i++){
        this.data += '@' + users[i].name.toLowerCase().split(' ').join('');
        this.data += '&nbsp;&nbsp;&nbsp;&nbsp;';
        this.data += '<input (click)="add()">Add ' + users[i].name.split(' ')[0] + '</input>';
        this.data += '<br><br>';
      }
      this.texthtml = this.data;
    });
  }

  /*
   *  One-argument wrapper for UserService -> addFriend
   */
  public add(friendID) {
    var cookie = this.cookieService.get("user-id");
    this.userService.getUserByID(cookie).subscribe(users => {
        if (users.length != 1) {
            console.log("UserID not found");
            this.redirect.navigate(['/']);
        } else {
            let userID = users[0].id;
            console.log('Make users ' + userID + ' and ' + friendID + ' friends.');
            this.userService.addFriend(userID, friendID);
            this.userService.addFriend(friendID, userID);  // Assume the friendship is two-sided :D
        }
    });
  }

  /*
   *  One-argument wrapper for UserService -> addFriend
   */
  public remove(friendID) {
    var cookie = this.cookieService.get("user-id");
    this.userService.getUserByID(cookie).subscribe(users => {
        if (users.length != 1) {
            console.log("UserID not found");
            this.redirect.navigate(['/']);
        } else {
            let userID = users[0].id;
            console.log('Make users ' + userID + ' and ' + friendID + ' friends.');
            this.userService.removeFriend(userID, friendID);
            this.userService.removeFriend(friendID, userID);
        }
    });
  }

}
