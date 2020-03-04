import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipsComponent } from './components/tips/tips.component';
import { StatiscticsComponent } from './components/statisctics/statisctics.component';
import { AccountComponent } from './components/account/account.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'tips', component: TipsComponent },
    { path: 'statistics', component: StatiscticsComponent },
    { path: 'account', component: AccountComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }