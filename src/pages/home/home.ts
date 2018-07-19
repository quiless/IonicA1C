/* Angular */
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';

/* Views */
import { TutorialPage } from '../../pages/tutorial/tutorial'
import { MedicalResultsPage } from '../../pages/medical-results/medical-results'
import { DashboardResultsPage } from '../../pages/dashboard-results/dashboard-results'

/* Components */ 
import { TextsConfigComponent } from '../../components/texts-config/texts-config'

@Component({
  selector: 'page-login',
  templateUrl: 'home.html',
})



export class HomePage {

  constructor(public navCtrl: NavController,
              private modalController : ModalController
              
            ) {
  }

  ionViewDidLoad() {
   
  }

  showTextsConfigModal(){
    let profileModal = this.modalController.create(TextsConfigComponent);
    profileModal.present();
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
