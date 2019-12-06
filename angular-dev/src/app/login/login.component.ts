import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialLoginModule, SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-login',
    providers: [AuthService, SocialLoginModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    data: any; 
    constructor(
        private router: Router,
        public redirect: Router,
        private socialAuthService: AuthService,
        private http: HttpClient,
        private userService: UserService,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        /*
         * Check if a valid UserID and token combination exist in cookies 
         * --   TODO Improve security around this and UserService... 
         *      maybe omit token from responses from the backend, 
         *      and make a function to verify tokens
         */

        var id = this.cookieService.get('user-id');
        this.userService.getUserByID(id).subscribe(users => {

            if (users.length != 1) {
                console.log("No valid session found in cookies.");
                return;
            }
            var user: User;
            if ((user=(<User>users[0])).token == this.cookieService.get('token')) {
                console.log("Valid, non-expired session found in cookies. Skipping log-in.");
                this.data = "Welcome back " + user.name + ", Redirecting...";
                this.login();
            } else {
                console.log("User found but token is wrong/expired");
            }

        });
    }

    public signinWithGoogle() {
        let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

        this.socialAuthService.signIn(socialPlatformProvider)
            .then((userData) => {
                //on success
                //this will return user data from google. What you need is a user token which you will send it to the server

                this.sendToRestApiMethod(userData.idToken,userData);
                console.log(userData);

                
                
            });
    }


    login() {
        setTimeout(function () {
            this.redirect.navigate(['/profile']);
        }.bind(this), 2000);

    }

    sendToRestApiMethod(idToken, userData: SocialUser) {
        console.log('Verifying token...');

        // handle promise when resolved
        function f(result: { authentic: Boolean, token: String }) {
            console.log('auth response: ', result.authentic);
            if (result.authentic) {

                //check to see if the user currently exists in the database, if not, add it to database.
                this.userService.getUserByID(userData.id).subscribe(users => {

                    if (users.length == 0) {
                        console.log("New User Detected, creating account.");
                        this.userService.makeNewUser(userData);
                        
                        
                    } 
                    //Update cookies with new token
                    //declare date and get current date time
                    var date = new Date();
                    date.setTime(date.getTime() + (20 * 60 * 1000));
                    this.userService.updateToken(userData.id, result.token);
                    this.cookieService.set('user-id', userData.id, date);
                    this.cookieService.set('token', result.token, date);

                    console.log(result.token);
                    console.log("Saved user in cookies");
                });
                
                console.log('OAuth success.\nRedirecting...');
                this.data = "Redirecting...";
                // (new LoginComponent).login();
                this.login();
            } else {
                console.log('Invalid username or password.');
                this.data = "Authorization failed";
            }
        };

        // check that server trusts us
        this.http.get("http://54.164.165.203/oauth.php", {
            params: {
                "idToken": idToken
            }
        }).subscribe(f.bind(this), f.bind(this));
    }

}
