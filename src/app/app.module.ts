import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';
import { PerfectViewClientsComponent } from './perfectview-clients.component';
import { ClientsListComponent } from './clients-list.component';
import { ClientInfoComponent } from './client-info.component';
import { PerfectViewClientsService } from './perfectview-clients.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports:     [ BrowserModule,
                 HttpModule,
                 FormsModule,
                 MaterialModule.forRoot(),
                //  NgbModule.forRoot(),
               ],
 declarations: [ AppComponent,
                 PerfectViewClientsComponent,
                 ClientsListComponent,
                 ClientInfoComponent,
                 LoginComponent,
               ],
 providers:    [ PerfectViewClientsService,
                 CookieService
               ],
  bootstrap:   [ AppComponent ]
})
export class AppModule { }
