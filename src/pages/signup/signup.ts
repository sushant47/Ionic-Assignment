import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { UrlRequestService } from '../services/url-request.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
let Title: string;
let Msg: string;
let btn: string;

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UrlRequestService]
})

export class SignUp {

  register: {
    userName: string,
    emailId: string,
    password: string,
    confirmPassword: string
  }


  constructor(public navCtrl: NavController, public http: Http, private urlRequestService: UrlRequestService, public alertCtrl: AlertController) {

    this.register = {
      userName: '',
      emailId: '',
      password: '',
      confirmPassword: ''

    }

  }


  postRequest() {

    let postParams = {
      username: this.register.userName,
      email: this.register.emailId,
      password: this.register.password
    }

    let url: string = 'https://extcafe.herokuapp.com/api/register';
    console.log(postParams.username);
    console.log(postParams.email);
    this.urlRequestService.postRequest(postParams, url).subscribe(data => {

      console.log(data['_body']);
      var stat = data['_body'];
      stat = JSON.parse(data['_body']);;
      console.log(stat.status);
      if (stat.status == "SUCCESS") {

        this.navCtrl.push(Login);

      }

    }, error => {
      alert("error" + error);
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

    if ((this.register.password == this.register.confirmPassword) && (this.register.password.length > 7) && (this.register.confirmPassword.length > 7)) {



      this.postRequest();
    }

    else if (this.register.password != this.register.confirmPassword) {

      Title = "Password Missmatch Error";
      Msg = "Password and Confirm password not matching!";
      btn = "Retry Signup";
      this.showAlert();
    }

    else if (this.register.password.length < 7) {

      Title = "Password Length error";
      Msg = "Password should be minimum 8 characters!";
      btn = "OK";
      this.showAlert();
    }

  }

}