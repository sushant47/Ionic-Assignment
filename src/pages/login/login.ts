import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LoginService } from '../services/login.service';
import { SignUp } from '../signup/signup';
import { CafeOutlets } from '../cafeoutlets/cafeoutlets';
import { TabsPage } from '../tabs/tabs';
import { UserInputData } from '../userinputdata/UserInputData';
import { URL } from '../constants/constants';
import { SegmentPage } from '../segment/segment';
import { AlertControllerData } from "../userinputdata/alertcontrollerdata";

let Title: string;
let Msg: string;
let btn: string;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})

export class Login {

  private loading;
  userLoginData: UserInputData = {};
  constructor(public alertCtrl:AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, private loginService: LoginService) {

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: Msg,
      buttons: [btn]
    });
    alert.present();
  }

  login(): void {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait. Login in progress'
    });

    this.loading.present();

    let postParams = {
      email: this.userLoginData.emailId,
      password: this.userLoginData.password
    }

    console.log(URL);
    console.log(postParams.email);
    console.log(postParams.password);
    this.loginService.post(postParams, URL.USER_LOGIN_URL).subscribe(data => {

      console.log(data);

      if (data.status == "SUCCESS") {

        this.loading.dismiss();
        localStorage.setItem("userid", this.userLoginData.emailId);
        localStorage.setItem("password", this.userLoginData.password);
        console.log(localStorage.getItem("userid"));
        console.log(localStorage.getItem("password"));
        this.navCtrl.push(SegmentPage);

      }

    }, error => {

      this.loading.dismiss();
      Title = "Login Error";
      Msg = "Please check username and password!";
      btn = "OK";
      this.showAlert();
      console.log(error);

    });


  }

  goBackSignUp(): void {


    this.navCtrl.push(SignUp);


  }


}
