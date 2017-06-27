import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { SignupService } from '../services/signup.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';
import { UserInputData } from '../userinputdata/UserInputData';
import {URL} from '../constants/constants';

let Title: string;
let Msg: string;
let btn: string;



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignupService]
})

export class SignUp{

  private loading;
  userInputData: UserInputData = {};
   
 
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, private signUpService: SignupService, public alertCtrl: AlertController) {
 

  }


  registerUser() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait. SignUp in progress..'
    });
 this.loading.present();
    let postParams = {
      username: this.userInputData.userName,
      email: this.userInputData.emailId,
      password: this.userInputData.password
    }

    console.log(postParams.username);
    console.log(postParams.email);
    this.signUpService.post(postParams, URL.USER_REGISTERATION_URL).subscribe(data => {

      console.log(data);

      if (data.status == "SUCCESS") {

        this.loading.dismiss();
        this.navCtrl.push(Login);

      }

    }, error => {
      this.loading.dismiss();
      Title = 'Sign Up Error';
      Msg = 'Please Check your internet Connection';
      btn = "OK";
      this.showAlert();
      console.log(error);

    });

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: Msg,
      buttons: [btn]
    });
    alert.present();
  }
  signUp(): void {

    if ((this.userInputData.password == this.userInputData.confirmPassword) && (this.userInputData.password.length > 7) && (this.userInputData.confirmPassword.length > 7)) {
      this.registerUser();
    }

    else if (this.userInputData.password != this.userInputData.confirmPassword) {

      Title = "Password Missmatch Error";
      Msg = "Password and Confirm password not matching!";
      btn = "Retry Signup";
      this.showAlert();
    }

    else if (this.userInputData.password.length < 7) {

      Title = "Password Length error";
      Msg = "Password should be minimum 8 characters!";
      btn = "OK";
      this.showAlert();
    }

  }

}