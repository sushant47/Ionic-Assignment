import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, LoadingController, ToastController, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../pages/services/login.service';
import { HomePage } from '../pages/home/home';
import { SignUp } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { CafeOutlets } from '../pages/cafeoutlets/cafeoutlets';
import { TabsPage } from '../pages/tabs/tabs';
import { SegmentPage } from '../pages/segment/segment';
import { Keyboard } from '@ionic-native/keyboard';


let loading: any;
let lastTimeBackPress = 0;
let timePeriodToExit = 2000;
@Component({
  templateUrl: 'app.html',
  providers: [LoginService]
})
export class MyApp implements OnInit {

  @ViewChild('myNav') nav: NavController
  rootPage: any;

  constructor(public app: App, private keyboard: Keyboard, private platform: Platform, public toastCtrl: ToastController, public loadingCtrl: LoadingController, statusBar: StatusBar, splashScreen: SplashScreen, private loginService: LoginService) {
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

    if ("userid" in localStorage && "password" in localStorage) {
      loading.dismiss();
      this.rootPage = SegmentPage;

    }
    else {
      loading.dismiss();
      this.rootPage = Login;
    }

  }
}

