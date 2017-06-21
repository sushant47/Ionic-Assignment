import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../services/login.service';
import { SignUp } from '../signup/signup';
import { CafeOutlets } from '../cafeoutlets/cafeoutlets';
import { TabsPage } from '../tabs/tabs';
import { UserInputData } from '../userinputdata/UserInputData';
import { URL } from '../constants/constants';
import { SegmentPage } from '../segment/segment';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})

export class Login {

  userLoginData: UserInputData = {};

  constructor(public navCtrl: NavController, private loginService: LoginService) {

  }


  login(): void {

    let postParams = {
      email: this.userLoginData.emailId,
      password: this.userLoginData.password
    }




    console.log(URL);
    console.log(postParams.email);
    console.log(postParams.password);
    this.loginService.post(postParams, URL.USER_LOGIN_URL).subscribe(data => {
     
      console.log(data);

      if (data.json.status == "SUCCESS") {

        localStorage.setItem("userid", this.userLoginData.emailId);
        localStorage.setItem("password", this.userLoginData.password);
        console.log(localStorage.getItem("userid"));
        console.log(localStorage.getItem("password"));
        this.navCtrl.push(SegmentPage);

      }

    }, error => {
      alert("error" + error);
      console.log(error);

    });


  }

  goBackSignUp(): void {


    this.navCtrl.push(SignUp);


  }


}
