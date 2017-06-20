import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SignUp} from '../pages/signup/signup';
import {Login} from '../pages/login/login';
import {CafeOutlets} from '../pages/cafeoutlets/cafeoutlets';
import { HttpModule }    from '@angular/http';
import { ModalPage } from '../pages/modal/modalpage';
import { TabsPage } from '../pages/tabs/tabs';
import { CafeLocation } from '../pages/cafelocation/cafelocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';
import { HttpService } from '../pages/services/http.service';
import {SegmentPage} from '../pages/segment/segment';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUp,
    Login,
    CafeOutlets,
    ModalPage,
    TabsPage,
    CafeLocation,
    SegmentPage
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
    CafeOutlets,
    ModalPage,
    TabsPage,
    CafeLocation,
    SegmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Keyboard,
    HttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
