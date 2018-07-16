/* Angular */
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

/* Views */
import { TutorialPage } from '../../pages/tutorial/tutorial'
import { MedicalResultsPage } from '../../pages/medical-results/medical-results'
import { DashboardResultsPage } from '../../pages/dashboard-results/dashboard-results'


@Component({
  selector: 'page-login',
  templateUrl: 'home.html',
})



export class HomePage {

  constructor(public navCtrl: NavController
            ) {
  }

  ionViewDidLoad() {
   
  }
  
  redirectTutorialPage(){
    this.navCtrl.push(TutorialPage);
  }

  redirectMedicalResultsPage(){
    this.navCtrl.push(MedicalResultsPage);
  }

  redirectDashboardResultsPage(){
    this.navCtrl.push(DashboardResultsPage);
  }
}
