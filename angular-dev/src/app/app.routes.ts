import { Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { DatabaseComponent } from './database/database.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'friends', component: FriendsComponent },
    { path: 'groups', component: GroupsComponent },
    { path: 'search', component: SearchComponent },
    { path: 'database', component: DatabaseComponent }

];
