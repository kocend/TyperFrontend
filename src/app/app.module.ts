import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';


import { AccountComponent } from './components/account/account.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { StatiscticsComponent } from './components/statisctics/statisctics.component';
import { TipsComponent } from './components/tips/tips.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    MenuBarComponent,
    StatiscticsComponent,
    TipsComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TabMenuModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    TableModule,
    PasswordModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    HttpClientModule,
    FontAwesomeModule,
    JwtModule
  ],
  providers: [
      AuthService,
      AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
