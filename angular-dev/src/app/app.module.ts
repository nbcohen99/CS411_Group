import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig, AuthService, GoogleLoginProvider} from 'angularx-social-login';
import { DatabaseComponent } from './database/database.component';

// Configs 
export function getAuthServiceConfigs() {
  const ClientID = "991940894202-2fiu3ivcpj8p0t1d03rjcu10qvcslira.apps.googleusercontent.com"
  let config = new AuthServiceConfig(
  [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(ClientID),
    }
  ]);
 return config;
}



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    DatabaseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
