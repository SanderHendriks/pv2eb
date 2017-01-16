import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onLogin = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;
  user: string = "";
  password : string = "";
  error: string = "";
  hardPW = '317ac7b8545034f7609b9ab36036bc03d4e8b653cd2405df914209f828b2340b';

  constructor(private _cookieService:CookieService){}
 
  getCookie(key: string){
    return this._cookieService.get(key);
  }
  setCookie(key: string, value: string){
    return this._cookieService.put(key, value);
  }

  ngOnInit() {
    this.user = this.getCookie("skyb-pv2eb-gebruiker");
  }

  login() {
    if (this.user != "info@skyb.nl") {
      this.error = "Onbekende gebruikersnaam";
      return;
    }
    var SHA256 = require("crypto-js/sha256");
    var pw = SHA256(this.password);
    if (pw != this.hardPW)
      this.error = "Verkeerde gebruikersnaam of wachtwoord";
    else {
      this.setCookie("skyb-pv2eb-gebruiker", this.user);
      this.isLoggedIn = true;
      this.onLogin.emit(true);
    }
  }

}
