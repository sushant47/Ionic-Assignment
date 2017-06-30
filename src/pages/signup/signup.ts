import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { UserService } from '../services/user-service.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';
import { UserInputData } from '../userinputdata/UserInputData';
import { URL, SIGNUP_ALERT_CONSTANTS, STATUS_MSG } from '../constants/constants';
import { AlertControllerData } from '../userinputdata/alertcontrollerdata';
import { AlertData } from '../useralertdata/alertdata';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UserService]
})

export class SignUp {

  private loading;
  userInputData: UserInputData = {};
  alertControllerData: AlertControllerData = {};
  private alertData: AlertData = new AlertData(this.alertCtrl);

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, private userService: UserService, public alertCtrl: AlertController) {

  }


  registerUser() {

    this.loading = this.loadingCtrl.create({
      content: SIGNUP_ALERT_CONSTANTS.SIGNUP_LOADING_MESSAGE
    });
    this.loading.present();
    let postParams = {
      username: this.userInputData.userName,
      email: this.userInputData.emailId,
      password: this.userInputData.password
    }

    console.log(postParams.username);
    console.log(postParams.email);
    this.userService.signup(postParams, URL.USER_REGISTERATION_URL).subscribe(data => {

      console.log(data);

      if (data.status == STATUS_MSG.STATUS_MSG_SUCCESS) {

        this.loading.dismiss();
        this.navCtrl.setRoot(Login);

      }

      else if (data.status == STATUS_MSG.STATUS_MSG_ERROR) {
        this.loading.dismiss();
        console.log(STATUS_MSG.STATUS_MSG_MESSAGE_FIRST_PARAM + postParams.email + STATUS_MSG.STATUS_MSG_MESSAGE_SECOND_PARAM);

          this.alertData.alertMessages(SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE, data.message, SIGNUP_ALERT_CONSTANTS.SSIGNUP_PROCESS_DUPLICATE_EMAILID_REGISTRATION_ERROR_TITLE_BTN);

      }

    }, error => {

      this.loading.dismiss();
      this.alertData.alertMessages(SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE, SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE_MSG, SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE_BTN);
      console.log(error);

    });

  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }

    return (false)
  }


  signUp(): void {

    if ((this.validateEmail(this.userInputData.emailId)) && (this.userInputData.password == this.userInputData.confirmPassword) && (this.userInputData.password.length > 7) && (this.userInputData.confirmPassword.length > 7)) {
      this.registerUser();
    }

    else if (!this.validateEmail(this.userInputData.emailId)) {

      this.alertData.alertMessages(SIGNUP_ALERT_CONSTANTS.SIGNUP_INVALID_EMAIL_ERROR_TITLE, SIGNUP_ALERT_CONSTANTS.SIGNUP_INVALID_EMAIL_ERROR_TITLE_MSG, SIGNUP_ALERT_CONSTANTS.SIGNUP_INVALID_EMAIL_ERROR_TITLE_BTN);

    }

    else if (this.userInputData.password.length < 7) {

      this.alertData.alertMessages(SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_TITLE, SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_MSG, SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_BTN);

    }

    else if (this.userInputData.password != this.userInputData.confirmPassword) {

      this.alertData.alertMessages(SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_TITLE, SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_MSG, SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_BTN);

    }


  }

}