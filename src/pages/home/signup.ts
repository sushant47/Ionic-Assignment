import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from './login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignUp {


  constructor(public navCtrl: NavController) {
//this.navCtrl.push(Login);
  }
 
signUp(): void {
   this.navCtrl.push(Login);
  }

}