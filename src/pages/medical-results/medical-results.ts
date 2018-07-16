/* Angular */

import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/* Views */
import {HomePage} from '../home/home'

/* Models */
import { Patient } from '../../models/patient'

/* Services */
import { PatientService } from '../../services/patientService'



@Component({
  selector: 'page-medical-results',
  templateUrl: 'medical-results.html'
})

export class MedicalResultsPage {

  patient = new Patient();

  @ViewChild(Slides) slides: Slides;

  Genders = [
              { "Name" : "Masculino", "Value" : 0}, 
              { "Name" : "Feminino", "Value" : 1}
            ];


  constructor(public navCtrl: NavController,
              private loadingController : LoadingController,
              private alertController : AlertController,
              private patientService : PatientService

            ) {
  }

  ionViewDidLoad() {
   
  }
  
  redirectHomePage (){
    this.navCtrl.push(HomePage);
  }

  savePatient(index){

    let blockUi = this.loadingController.create({
      spinner: 'ios'
    });

    let alert = this.alertController.create({
      buttons: ['Ok']
    });

    blockUi.present();

    return this.patientService.savePatient(this.patient).subscribe(result => {
      blockUi.dismiss().then(() => {
        alert.present().then(() => {
          this.slideNext(null);
        });
      });
    }, error =>{
      blockUi.dismiss().then(() => {
        let stringMessageError = "";

        JSON.parse(error._body).forEach(function(value){
          stringMessageError += value + "; <br>";
        });

        stringMessageError = stringMessageError.split(";").join("; \n")
        alert.setMessage(stringMessageError);
        alert.present();
      });
    });
  }
  
  slideNext(index){
    if (index == 2) {
      this.redirectHomePage();
    } else {
      this.slides.slideNext();
    }
  }

  slidePrev(index){
    if (index == 1){
      this.patient = new Patient();
    } else {
      this.slides.slidePrev();
    }  
  }

  getPatientByRG(){


    let blockUi = this.loadingController.create({
      spinner: 'ios'
    });

    let alert = this.alertController.create({
      buttons: ['Ok']
    });

    blockUi.present();

    
    if(this.patient.RG == undefined || this.patient.RG == "" ){
      alert.setMessage("Para buscar o paciente por RG, é necessário que o campo RG esteja preenchido.");
      alert.present();
      blockUi.dismiss()
    } else {
      return this.patientService.getPatientByRG(this.patient.RG).subscribe(result => {
        blockUi.dismiss().then(() => {
          var response = JSON.parse(result["_body"]);

          if (response == null){
            alert.setMessage("Paciente não encontrado. Necessário cadastra-lo.");
            alert.present();
            this.patient.Name = "";
            this.patient.RG = "";
            this.patient.Gender = null;
            this.patient.PhoneNumber = "";
            this.patient.Email = "";
            this.patient.Birthdate = null;
          } else {
            alert.setMessage("Paciente encontrado.");
            alert.present();
            this.patient = response;
          }
        });
      }, error =>{
        blockUi.dismiss().then(() => {
          let stringMessageError = "";
  
          JSON.parse(error._body).forEach(function(value){
            stringMessageError += value + "; <br>";
          });
  
          stringMessageError = stringMessageError.split(";").join("; \n")
          alert.setMessage(stringMessageError);
          alert.present();
        });
      });
    }

  }
}
