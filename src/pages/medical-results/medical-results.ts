/* Angular */

import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/* Views */
import {HomePage} from '../home/home'

/* Models */
import { Patient } from '../../models/patient'
import { MedicalResult } from '../../models/medicalResult'
import { UserInfo } from '../../models/userInfo'

/* Services */
import { PatientService } from '../../services/patientService'
import { MedicalResultService } from '../../services/medicalResultService'



/* Native */
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-medical-results',
  templateUrl: 'medical-results.html'
})

export class MedicalResultsPage {

  patient = new Patient();
  medicalResult = new MedicalResult();
  
  @ViewChild(Slides) slides: Slides;

  genders = [
    { "Name" : "Masculino", "Value" : 0}, 
    { "Name" : "Feminino", "Value" : 1}
  ];

  repeatDays = [
    { "Name" : "Não repetir", "Value" : "0"},
    { "Name" : "30 dias", "Value" : 30}, 
    { "Name" : "60 dias", "Value" : 60}, 
    { "Name" : "90 dias", "Value" : 90}, 
  ];

  resultadoDevice = 0;
            
  constructor(public navCtrl: NavController,
              private loadingController : LoadingController,
              private alertController : AlertController,
              private medicalResultService : MedicalResultService,
              private patientService : PatientService,
              private storage : Storage

            ) {
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
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
    console.log(index);
    console.log(this.resultadoDevice);
    if (index == 2) {
      this.redirectHomePage();
    } else if (index == 1 && (this.resultadoDevice < 4 || this.resultadoDevice > 13)){
      let alert = this.alertController.create({
        buttons: ['Ok']
      });
      alert.setMessage("O resultado não pode ser menor do que 4% ou maior que 13 %");
      return alert.present();
  } else {
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }
  }

  slidePrev(index){
    if (index == 1){
      this.patient = new Patient();
    } else {
      this.slides.lockSwipes(false);
      this.slides.slidePrev();
      this.slides.lockSwipes(true);
    }  
  }

  advanceUserIsPatient(){
    this.storage.get("userInfoLogged").then((result) => {
      this.patient.Name = result.Name;
      this.patient.Id = result.Patient.Id;
      this.patient.Email = result.Email;
      this.patient.RG = result.RG
      this.patient.PhoneNumber = result.PhoneNumber;
    }).then(() => {
      this.slideNext(0);
    })
  }

  advanceSlide(){

    let alert = this.alertController.create({
      buttons: ['Ok']
    });


    if (this.patient.Name == null || this.patient.Email == null || this.patient.PhoneNumber == null){
      alert.setMessage("Não é possível avançar sem os dados do paciente.");
      alert.present();
    } else {
      this.slideNext(0);
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


  saveMedicalResult(){
    this.medicalResult.PatientId = this.patient.Id;
    this.medicalResult.PercentGlycogen = 5.3;
    this.medicalResult.MediumGlycogen = 105.3;

    let blockUi = this.loadingController.create({
      spinner: 'ios'
    });

    let alert = this.alertController.create({
      buttons: ['Ok']
    });

    blockUi.present();

    return this.medicalResultService.saveMedicalResult(this.medicalResult).subscribe(result => {
      blockUi.dismiss().then(() => {
        var response = JSON.parse(result["_body"]);
        console.log(response);
        alert.setMessage("Resultado cadastrado com sucesso!")
        alert.present().then(() => {
          this.redirectHomePage();
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
}
