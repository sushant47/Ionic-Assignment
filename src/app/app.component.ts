import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../pages/services/login.service';
import { HomePage } from '../pages/home/home';
import { SignUp } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { CafeOutlets } from '../pages/cafeoutlets/cafeoutlets';
import { TabsPage } from '../pages/tabs/tabs';
import { SegmentPage } from '../pages/segment/segment';

@Component({
  templateUrl: 'app.html',
  providers: [LoginService]
})
export class MyApp implements OnInit {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private loginService: LoginService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit(): void {

    if ("userid" in localStorage && "password" in localStorage) {

      this.rootPage = SegmentPage;
      // let postParams = {
      //   email: localStorage.getItem("userid"),
      //   password: localStorage.getItem("password")
      // }



      // let url: string = 'https://extcafe.herokuapp.com/api/login';
      // console.log(postParams.email);
      // console.log(postParams.password);
      // this.loginService.postRequest(postParams, url).subscribe(data => {

      //   console.log(data['_body']);
      //   var stat = data['_body'];
      //   stat = JSON.parse(data['_body']);;
      //   console.log(stat.status);
      //   if (stat.status == "SUCCESS") {


      //     this.rootPage = TabsPage;

      //   }

      // }, error => {
      //   alert("error" + error);
      //   console.log(error);

      // });

    }
    else {
      this.rootPage = Login;
    }

  }
}

