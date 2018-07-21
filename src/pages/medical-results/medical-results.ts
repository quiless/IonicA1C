/* Angular */

import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/* Views */
import {HomePage} from '../home/home'
import {DashboardResultsPage} from '../dashboard-results/dashboard-results'

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
  resultParam : any;
  mediumGlycogen = 0;
  redirectDashboard : any;
            
  constructor(public navCtrl: NavController,
              private loadingController : LoadingController,
              private alertController : AlertController,
              private medicalResultService : MedicalResultService,
              private patientService : PatientService,
              private storage : Storage,
              private navParams: NavParams

            ) {


           this.resultParam = navParams.get('Result');
           console.log(this.resultParam);

           if (this.resultParam != "" && this.resultParam != null){

            this.patient.Name = this.resultParam.Patient.Name;
            this.patient.Id = this.resultParam.PatientId;
            this.patient.Email = this.resultParam.Patient.Email;
            this.patient.RG = this.resultParam.Patient.RG;
            this.patient.PhoneNumber = this.resultParam.Patient.PhoneNumber;
            this.resultadoDevice = this.resultParam.PercentGlycogen
            this.mediumGlycogen = this.resultParam.MediumGlycogen
            this.medicalResult.RepeatDays = this.resultParam.RepeatDays;
                setTimeout(() => {
                  this.slideNext(0);
                  this.slideNext(1);
              }, 100)
            this.redirectDashboard = true;
           }
           else {
            this.redirectDashboard = false;
           }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slides.initialSlide = 1; 
      this.slides.slideTo(1,500);
  }, 1000)
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    setTimeout(() => {
      this.slides.initialSlide = 1; 
      this.slides.slideTo(1,500);
  }, 1000)
   
  }
  
  redirectHomePage (){
    this.navCtrl.push(HomePage);
  }

  redirectSlide2(){
    this.slides.slideTo(2);
  }

  
  redirectDashboardResultsPage (Result){
    this.navCtrl.push(DashboardResultsPage);
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
