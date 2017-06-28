import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, LoadingController, ToastController, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../pages/services/login.service';
import { HomePage } from '../pages/home/home';
import { SignUp } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { SegmentPage } from '../pages/segment/segment';
import { Keyboard } from '@ionic-native/keyboard';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SENDER_ID, URL } from '../pages/constants/constants';
import { HttpService } from '../pages/services/http.service';
import { UserInputData } from "../pages/userinputdata/UserInputData";

let loading: any;
let lastTimeBackPress = 0;
let timePeriodToExit = 2000;
@Component({
  templateUrl: 'app.html',
  providers: [HttpService]
})
export class MyApp implements OnInit {

  @ViewChild('myNav') nav: NavController
  rootPage: any;
  userLoginData: UserInputData = {};

  constructor(public push: Push, public app: App, private keyboard: Keyboard, private platform: Platform, public toastCtrl: ToastController, public loadingCtrl: LoadingController, statusBar: StatusBar, splashScreen: SplashScreen, private httpService: HttpService) {
    platform.ready().then(() => {

      let nav = this.app.getActiveNav();
      platform.registerBackButtonAction(() => this.myHandlerFunction());
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  myHandlerFunction() {

    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
      this.platform.exitApp();
    }
    else {
      let toast = this.toastCtrl.create({
        message: "Press Again to Confirm Exit",
        duration: 3000
      });
      toast.present();
      lastTimeBackPress = new Date().getTime();
    }

  }


  ngOnInit(): void {

    loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {

          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    const options: PushOptions = {
      android: {
        senderID: SENDER_ID
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered ' + registration.registrationId);
      this.userLoginData.deviceToken = registration.registrationId;
      this.registerDevice();
    });


    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    if ("userid" in localStorage && "password" in localStorage) {
      loading.dismiss();
      this.rootPage = SegmentPage;

    }
    else {
      loading.dismiss();
      this.rootPage = Login;
    }

  }

  registerDevice(): any {

    let postParams = {
      deviceToken: this.userLoginData.deviceToken,
      userId: localStorage.getItem("userid")
    }

alert(postParams);

console.log("postparams " + postParams.userId);
    this.httpService.post(postParams, URL.REGISTER_DEVICE).subscribe(data => {

      console.log("app component " + data);

      if (data.status == "SUCCESS") {

        alert("success");

      }

      else if (data.status == "ERROR") {

        alert("error");

      }

    }, error => {

      alert("network error " + error);
      console.log(error);

    });

  }

}

