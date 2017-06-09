import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UrlRequestService } from '../services/url-request.service';
import { SignUp } from '../signup/signup';
import { CafeOutlets } from '../cafeoutlets/cafeoutlets';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UrlRequestService]
})

export class Login {

  userLogin: {
    emailId: string,
    password: string
  }
  // userLogin: UserLogin = new UserLogin();
  constructor(public navCtrl: NavController, private urlRequestService: UrlRequestService) {

    this.userLogin = {
      emailId: '',
      password: ''
    }

  }


  login(): void {

    let postParams = {
      email: this.userLogin.emailId,
      password: this.userLogin.password
    }



    let url: string = 'https://extcafe.herokuapp.com/api/login';
    console.log(postParams.email);
    console.log(postParams.password);
    this.urlRequestService.postRequest(postParams, url).subscribe(data => {
      //alert("data " + data);
      console.log(data['_body']);
      var stat = data['_body'];
      stat = JSON.parse(data['_body']);;
      console.log(stat.status);
      if (stat.status == "SUCCESS") {

        localStorage.setItem("userid", this.userLogin.emailId);
        localStorage.setItem("password", this.userLogin.password);
        console.log(localStorage.getItem("userid"));
        console.log(localStorage.getItem("password"));
        this.navCtrl.push(CafeOutlets);

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

  goBackSignUp(): void {


    this.navCtrl.push(SignUp);


  }


}
