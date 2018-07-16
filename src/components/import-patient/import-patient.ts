/* Angular */
import { Component, Input } from '@angular/core';
import { NavController, 
        LoadingController, 
        AlertController, 
        ModalController,
        ToastController, 
        ViewController,
        Events } from 'ionic-angular';


@Component({
  selector: 'import-patient',
  templateUrl: 'import-patient.html'
})

export class ImportPatientComponent {


  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private viewController : ViewController,
    private modalController : ModalController, 
    private events : Events) { 
  }

  dismiss(){
    this.viewController.dismiss();
  }



  
  

}