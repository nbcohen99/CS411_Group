import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  providers: [AuthService, SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    ) { }

  ngOnInit() {
  }

  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
 
    this.socialAuthService.signIn(socialPlatformProvider)
    .then((userData) => {
       //on success
       //this will return user data from google. What you need is a user token which you will send it to the server

       //this.sendToRestApiMethod(userData.idToken);
       console.log(userData);
    });
 }


  login() {
    this.router.navigate(['/search'])
  }

}
