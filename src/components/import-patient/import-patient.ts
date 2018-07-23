/* Angular */
import { Component, Input } from '@angular/core';
import { NavController, 
        LoadingController, 
        AlertController, 
        ModalController,
        ToastController, 
        ViewController,
        Events } from 'ionic-angular';
import { MedicalResultService } from '../../services/medicalResultService'


@Component({
  selector: 'import-patient',
  templateUrl: 'import-patient.html'
})

export class ImportPatientComponent {

    RG = "";

  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private medicalResultService : MedicalResultService,
    private viewController : ViewController,
    private modalController : ModalController, 
    private events : Events) { 
  }

  dismiss(){
    this.viewController.dismiss();
  }

  importMedicalResults(){
    console.log(this.RG);
      this.medicalResultService.importMedicalResults(this.RG).subscribe( result => {
        console.log(result);
        this.events.publish("importPatient");
        this.dismiss();
      })
  }



  
  

}