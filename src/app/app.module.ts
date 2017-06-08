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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUp,
    Login,
    CafeOutlets,
    ModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUp,
    Login,
    CafeOutlets,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
