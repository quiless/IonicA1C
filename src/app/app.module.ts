/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slides } from 'ionic-angular';
import { HttpModule } from '@angular/http';

/* Native */
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

/* App */
import { MyApp } from './app.component';

/* Pages */
import { LoginPage } from '../pages/login/login';
import { RegisterPersonPage } from '../pages/register-person/register-person';
import { HomePage } from '../pages/home/home'
import { TutorialPage } from '../pages/tutorial/tutorial'

/* Services */
import { AuthService } from '../services/authService'
import { UserInfoService } from '../services/userInfoService'

/* Natives */
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TutorialPage,
    RegisterPersonPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    TutorialPage,
    RegisterPersonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Slides,
    UserInfoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
