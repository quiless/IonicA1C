/* Angular */
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

/* Views */
import { TutorialPage } from '../../pages/tutorial/tutorial'


@Component({
  selector: 'page-login',
  templateUrl: 'home.html',
  entryComponents:[TutorialPage]
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
}
