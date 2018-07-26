import { Component,  } from '@angular/core';
import { Platform, ModalController, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MedicalResultsPage } from '../pages/medical-results/medical-results';
import { HomePage } from '../pages/home/home';
import { DashboardResultsPage } from '../pages/dashboard-results/dashboard-results';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController,public events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      //splashScreen.hide();
      //let splash = modalCtrl.create(SplashPage);
      //splash.present();
    });

   
  }

  
}

