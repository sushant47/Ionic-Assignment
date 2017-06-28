import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SignUp} from '../pages/signup/signup';
import {Login} from '../pages/login/login';
import { HttpModule }    from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';
import { HttpService } from '../pages/services/http.service';
import {SegmentPage} from '../pages/segment/segment';
import { AddCafe } from '../pages/addcafe/addcafe';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUp,
    Login,
    SegmentPage,
    AddCafe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUp,
    Login,
    SegmentPage,
    AddCafe
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Push,
    Keyboard,
    HttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
