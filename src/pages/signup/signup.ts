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
export class Register {

  public userName: string;
  public emailId: string;
  public password: string;
  public confirmPassword: string;

}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UrlRequestService]
})

export class SignUp {


  register: Register = new Register();
  constructor(public navCtrl: NavController, public http: Http, private urlRequestService: UrlRequestService, public alertCtrl: AlertController) {
    // this.http.post('https://extcafe.herokuapp.com/api/register','{'sushant','sushantbilgi47@gmail.com', '123456789'}').map(res => res.json()).subscribe(data =>{
    //   let a = data;
    //   alert(a);
    // });
    // this.http.post('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
    //     //this.posts = data.data.children;
    // });
    //this.navCtrl.push(Login);
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
      //alert("data " + data);
      console.log(data['_body']);
      var stat = data['_body'];
      stat = JSON.parse(data['_body']);;
      console.log(stat.status);
      if (stat.status == "SUCCESS") {

        this.navCtrl.push(Login);

      }
      //this.response = data['_body'];
      //return(this.response);
      //return Promise.resolve(UrlRequestService);
    }, error => {
      alert("error" + error);
      console.log(error);
      //this.response = error;
      //return Promise.resolve(this.response);
    });
    //alert("reply " + this.urlRequestService.response);
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
    //alert("" + this.register.userName);



    if ((this.register.password == this.register.confirmPassword) && (this.register.password.length > 7) && (this.register.confirmPassword.length > 7)) {

      // if (){

      // }

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