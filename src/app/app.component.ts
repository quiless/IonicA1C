import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MedicalResultsPage } from '../pages/medical-results/medical-results';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { DashboardResultsPage } from '../pages/dashboard-results/dashboard-results';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      //let splash = modalCtrl.create(SplashPage);
      //splash.present();
    });
  }
}

