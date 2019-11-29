import { Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { DatabaseComponent } from './database/database.component';

export const routes: Routes = [
    {path: '', component: LoginComponent },
    { path: 'search', component: SearchComponent },
    { path: 'database', component: DatabaseComponent }

];
