import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-login',
    providers: [AuthService, SocialLoginModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        public redirect: Router,
        private socialAuthService: AuthService,
        private http: HttpClient,
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    public signinWithGoogle() {
        let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

        this.socialAuthService.signIn(socialPlatformProvider)
            .then((userData) => {
                //on success
                //this will return user data from google. What you need is a user token which you will send it to the server

                this.sendToRestApiMethod(userData.idToken);
                console.log(userData);

                //check to see if the user currently exists in the database, if not, add it to database.
                this.userService.getUserByID(userData.id).subscribe(users => {
                    
                    if (users.length == 0) {
                        console.log("New User Detected, creating account.");
                        this.userService.makeNewUser(userData);
                        return
                    }else {
                        console.log("Returning User Detected, token updated");
                        this.userService.updateToken(userData.id, userData.idToken)
                    }
                });
                
            });
    }


    login() {
        setTimeout(function () {
            this.redirect.navigate(['/search']);
        }.bind(this), 2000);

    }

    sendToRestApiMethod(idToken) {
        console.log('Verifying token...');

        // handle promise when resolved
        function f(result: { authentic: Boolean, token: String }) {
            console.log('auth response: ', result.authentic);
            if (result.authentic) {
                console.log('OAuth success.\nRedirecting...');
                document.getElementById("multi_lines_text").innerHTML = '<p">Redirecting...<p>';
                // (new LoginComponent).login();
                this.login();
            } else {
                console.log('Invalid username or password.');
                document.getElementById("multi_lines_text").innerHTML = '<p style="color: red">Authorization failed<p>';
            }
        };

        // check that server trusts us
        this.http.get("https://54.164.165.203/oauth.php", {
            params: {
                "idToken": idToken
            }
        }).subscribe(f.bind(this), f.bind(this));
    }

}
