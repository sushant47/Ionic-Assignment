import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from './login';

export class Register {
  
    public userName: string;
    public emailId: string;
    public password: string;
    public confirmPassword: string;
  
}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignUp {

  register:Register = new Register();
  constructor(public navCtrl: NavController) {
//this.navCtrl.push(Login);
  }
 
signUp(): void {
   alert("" + this.register.userName);

  }

}