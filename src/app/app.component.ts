import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MedicalResultsPage } from '../pages/medical-results/medical-results';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { DashboardResultsPage } from '../pages/dashboard-results/dashboard-results';
import { DashboardFilterComponent } from '../components/dashboard-filter/dashboard-filter';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = DashboardFilterComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      //splashScreen.hide();
      //let splash = modalCtrl.create(SplashPage);
      //splash.present();
    });
  }
}

