import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UrlRequestService } from '../pages/services/url-request.service';
import { HomePage } from '../pages/home/home';
import { SignUp } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { CafeOutlets } from '../pages/cafeoutlets/cafeoutlets';
@Component({
  templateUrl: 'app.html',
  providers: [UrlRequestService]
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private urlRequestService: UrlRequestService) {
    platform.ready().then(() => {
      if ("userid" in localStorage && "password" in localStorage) {

        
        let postParams = {
      email: localStorage.getItem("userid"),
      password: localStorage.getItem("password")
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
        if(stat.status == "SUCCESS"){

          
          this.rootPage = CafeOutlets;

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

      }
      else {
         this.rootPage = Login;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

