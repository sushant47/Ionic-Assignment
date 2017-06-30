import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../services/user-service.service';
import { SignUp } from '../signup/signup';
import { UserInputData } from '../userinputdata/UserInputData';
import { URL, STATUS_MSG, LOGIN_ALERT_CONSTANTS } from '../constants/constants';
import { SegmentPage } from '../segment/segment';
import { AlertControllerData } from "../userinputdata/alertcontrollerdata";
import { HttpService } from "../services/http.service";
import { AlertData } from "../useralertdata/alertdata";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService, HttpService]
})

export class Login {

  private loading;
  private alertData: AlertData = new AlertData(this.alertCtrl);
  userLoginData: UserInputData = {};
  alertControllerData: AlertControllerData = {};
  constructor(public httpService: HttpService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, private userService: UserService) {

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
    this.userService.login(postParams, URL.USER_LOGIN_URL).subscribe(data => {

      console.log(data);
      if (data.status == STATUS_MSG.STATUS_MSG_SUCCESS) {

        this.loading.dismiss();
        this.userLoginData.user_id = data.user._id;
        localStorage.setItem("user_id", this.userLoginData.user_id);
        console.log(localStorage.getItem("user_id"));
        this.registerDevice();
        this.navCtrl.setRoot(SegmentPage);

      }

      else if (data.status == STATUS_MSG.STATUS_MSG_ERROR) {

        this.loading.dismiss();
        this.alertData.alertMessages(LOGIN_ALERT_CONSTANTS.LOGIN_CREDENTIALS_ERROR_TITLE, LOGIN_ALERT_CONSTANTS.LOGIN_CREDENTIALS_ERROR_TITLE_MSG, LOGIN_ALERT_CONSTANTS.LOGIN_CREDENTIALS_ERROR_TITLE_BTN);

      }

    }, error => {

      this.loading.dismiss();
      this.alertData.alertMessages(LOGIN_ALERT_CONSTANTS.LOGIN_NETWORK_ERROR_TITLE, LOGIN_ALERT_CONSTANTS.LOGIN_NETWORK_ERROR_TITLE_MSG, LOGIN_ALERT_CONSTANTS.LOGIN_NETWORK_ERROR_TITLE_BTN);
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

    console.log("postparams " + postParams.userId);
    this.httpService.post(postParams, URL.REGISTER_DEVICE).subscribe(data => {

      console.log("app component " + data);

      if (data.status == "SUCCESS") {


        console.log("device registration successful");

      }

      else if (data.status == "ERROR") {

        console.log("device registration unsuccessful");

      }

    }, error => {

      console.log("network error " + error);
      console.log(error);

    });

  }


}
