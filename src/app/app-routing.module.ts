import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipsComponent } from './components/tips/tips.component';
import { StatiscticsComponent } from './components/statisctics/statisctics.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tips', component: TipsComponent, canActivate: [AuthGuardService] },
    { path: 'statistics', component: StatiscticsComponent, canActivate: [AuthGuardService] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },

    { path: '**', redirectTo: 'login' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
