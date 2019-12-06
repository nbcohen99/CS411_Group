import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

    constructor(
        private redirect: Router,
        private cookieService: CookieService
    ) { }

    /*
     * Logs you out and redirects you to home page
     */
    public logOut() {
        this.cookieService.set("user-id", "");
        this.cookieService.set("token", "");
        this.redirect.navigate(['/profile']);
    }
}
