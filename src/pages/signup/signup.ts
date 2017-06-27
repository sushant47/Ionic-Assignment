import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { SignupService } from '../services/signup.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';
import { UserInputData } from '../userinputdata/UserInputData';
import { URL, SIGNUP_ALERT_CONSTANTS, STATUS_MSG } from '../constants/constants';
import { AlertControllerData } from "../userinputdata/alertcontrollerdata";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignupService]
})

export class SignUp {

  private loading;
  userInputData: UserInputData = {};
  alertControllerData: AlertControllerData = {};

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, private signUpService: SignupService, public alertCtrl: AlertController) {

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
    this.signUpService.post(postParams, URL.USER_REGISTERATION_URL).subscribe(data => {

      console.log(data);

      if (data.status == STATUS_MSG.STATUS_MSG_SUCCESS) {

        this.loading.dismiss();
        this.navCtrl.push(Login);

      }

      else if (data.status == STATUS_MSG.STATUS_MSG_ERROR) {
        this.loading.dismiss();
        if (data.message.includes(STATUS_MSG.STATUS_MSG_MESSAGE_FIRST_PARAM) && (data.message.includes(STATUS_MSG.STATUS_MSG_MESSAGE_SECOND_PARAM))) {
          this.alertControllerData.title = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE;
          this.alertControllerData.msg = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_DUPLICATE_EMAILID_REGISTRATION_ERROR_TITLE_MSG;
          this.alertControllerData.btn = SIGNUP_ALERT_CONSTANTS.SSIGNUP_PROCESS_DUPLICATE_EMAILID_REGISTRATION_ERROR_TITLE_BTN;
          this.showAlert();
        }
        else {
          this.alertControllerData.title = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE;
          this.alertControllerData.msg = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_GENERIC_TITLE_MSG;
          this.alertControllerData.btn = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_GENERIC_TITLE_BTN;
          this.showAlert();
        }

      }

    }, error => {
      this.loading.dismiss();
      this.alertControllerData.title = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE;
      this.alertControllerData.msg = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE_MSG;
      this.alertControllerData.btn = SIGNUP_ALERT_CONSTANTS.SIGNUP_PROCESS_ERROR_TITLE_BTN;
      this.showAlert();
      console.log(error);

    });

  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }

    return (false)
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertControllerData.title,
      subTitle: this.alertControllerData.msg,
      buttons: [this.alertControllerData.btn]
    });
    alert.present();
  }
  signUp(): void {

    if ((this.validateEmail(this.userInputData.emailId)) && (this.userInputData.password == this.userInputData.confirmPassword) && (this.userInputData.password.length > 7) && (this.userInputData.confirmPassword.length > 7)) {
      this.registerUser();
    }

    else if (!this.validateEmail(this.userInputData.emailId)) {

      this.alertControllerData.title = SIGNUP_ALERT_CONSTANTS.SIGNUP_INVALID_EMAIL_ERROR_TITLE;
      this.alertControllerData.msg = SIGNUP_ALERT_CONSTANTS.SIGNUP_INVALID_EMAIL_ERROR_TITLE_MSG;
      this.alertControllerData.btn = SIGNUP_ALERT_CONSTANTS.SIGNUP_INVALID_EMAIL_ERROR_TITLE_BTN;
      this.showAlert();

    }

    else if (this.userInputData.password.length < 7) {

      this.alertControllerData.title = SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_TITLE;
      this.alertControllerData.msg = SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_MSG;
      this.alertControllerData.btn = SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_LENGTH_ERROR_BTN;
      this.showAlert();
    }

    else if (this.userInputData.password != this.userInputData.confirmPassword) {

      this.alertControllerData.title = SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_MISSMATCH_ERROR_TITLE;
      this.alertControllerData.msg = SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_MISSMATCH_ERROR_MSG;
      this.alertControllerData.btn = SIGNUP_ALERT_CONSTANTS.SIGNUP_PASSWORD_MISSMATCH_ERROR_BTN;
      this.showAlert();
    }


  }

}