import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LoginService } from '../services/login.service';
import { SignUp } from '../signup/signup';
import { UserInputData } from '../userinputdata/UserInputData';
import { URL, STATUS_MSG, LOGIN_ALERT_CONSTANTS } from '../constants/constants';
import { SegmentPage } from '../segment/segment';
import { AlertControllerData } from "../userinputdata/alertcontrollerdata";
import { HttpService } from "../services/http.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService,HttpService]
})

export class Login {

  private loading;
  userLoginData: UserInputData = {};
  alertControllerData: AlertControllerData = {};
  constructor(public httpService: HttpService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, private loginService: LoginService) {

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertControllerData.title,
      subTitle: this.alertControllerData.msg,
      buttons: [this.alertControllerData.btn]
    });
    alert.present();
  }

  login(): void {

    this.loading = this.loadingCtrl.create({
      content: LOGIN_ALERT_CONSTANTS.LOGIN_LOADING_MESSAGE
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
      console.log("user_id " + data.user._id);
      if (data.status == STATUS_MSG.STATUS_MSG_SUCCESS) {

        this.loading.dismiss();
        this.userLoginData.user_id = data.user._id;
        localStorage.setItem("userid", this.userLoginData.emailId);
        localStorage.setItem("password", this.userLoginData.password);
        localStorage.setItem("user_id", this.userLoginData.user_id);
        console.log(localStorage.getItem("userid"));
        console.log(localStorage.getItem("user_id"));
        console.log(localStorage.getItem("password"));
        this.registerDevice();
        this.navCtrl.push(SegmentPage);

      }

      else if (data.status == STATUS_MSG.STATUS_MSG_ERROR) {

        this.loading.dismiss();
        this.alertControllerData.title = LOGIN_ALERT_CONSTANTS.LOGIN_CREDENTIALS_ERROR_TITLE;
        this.alertControllerData.msg = LOGIN_ALERT_CONSTANTS.LOGIN_CREDENTIALS_ERROR_TITLE_MSG;
        this.alertControllerData.btn = LOGIN_ALERT_CONSTANTS.LOGIN_CREDENTIALS_ERROR_TITLE_BTN;
        this.showAlert();

      }

    }, error => {

      this.loading.dismiss();
      this.alertControllerData.title = LOGIN_ALERT_CONSTANTS.LOGIN_NETWORK_ERROR_TITLE;
      this.alertControllerData.msg = LOGIN_ALERT_CONSTANTS.LOGIN_NETWORK_ERROR_TITLE_MSG;
      this.alertControllerData.btn = LOGIN_ALERT_CONSTANTS.LOGIN_NETWORK_ERROR_TITLE_BTN;
      this.showAlert();
      console.log(error);

    });


  }

  goBackSignUp(): void {

    this.navCtrl.push(SignUp);

  }

  registerDevice(): any {

    let postParams = {
      deviceToken: localStorage.getItem("registration_id"),
      userId: localStorage.getItem("user_id")
    }

//alert(postParams);

console.log("postparams " + postParams.userId);
    this.httpService.post(postParams, URL.REGISTER_DEVICE).subscribe(data => {

      console.log("app component " + data);

      if (data.status == "SUCCESS") {


        alert("success");

      }

      else if (data.status == "ERROR") {

        alert("error");

      }

    }, error => {

      alert("network error " + error);
      console.log(error);

    });

  }


}
