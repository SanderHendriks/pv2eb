import { Component } from '@angular/core';

@Component({
  selector: 'skyb-app',
  templateUrl: './app.component.html',
})
export class AppComponent  { 

  title = 'SKYB PV2eB'; 
  isLoggedIn: boolean = false;

  // record which client is selected by the user
  onLogin(succes: boolean) {
    console.log("onLogin(" + succes + ")");
    this.isLoggedIn = succes;
  }

}
