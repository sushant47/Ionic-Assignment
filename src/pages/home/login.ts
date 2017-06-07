import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UrlRequestService} from '../services/url-request.service';
import {SignUp} from './signup';

export class UserLogin {

  public emailId: string;
  public password: string;
  
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UrlRequestService]
})

export class Login {

  userLogin: UserLogin = new UserLogin();
  constructor(public navCtrl: NavController, private urlRequestService: UrlRequestService) {

  }

login(): void {
    //alert("" + this.register.userName);
    //this.postRequest();
    let postParams = {
      email: this.userLogin.emailId,
      password: this.userLogin.password
    }

    

    let url:string = 'https://extcafe.herokuapp.com/api/login';
    console.log(postParams.email);
    console.log(postParams.password);
    this.urlRequestService.postRequest(postParams,url).subscribe(data => {
        //alert("data " + data);
        console.log(data['_body']);
        var stat = data['_body'];
        stat = JSON.parse(data['_body']);; 
        console.log(stat.status);
        // if(stat.status){

        //   this.navCtrl.push(Login);

        // }
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
