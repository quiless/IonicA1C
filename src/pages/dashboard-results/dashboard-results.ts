/* Angular */
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController, Events } from 'ionic-angular';

/* Components */
import { DashboardFilterComponent } from '../../components/dashboard-filter/dashboard-filter'
import { ImportPatientComponent } from '../../components/import-patient/import-patient'

/* Services */
import { MedicalResultService } from '../../services/medicalResultService'


@Component({
  selector: 'page-dashboard-results',
  templateUrl: 'dashboard-results.html'
})

export class DashboardResultsPage {

  public columns : any;
  public rows : any;
  
  MedicalResults = [];
  AuxMedicalResults = [];
   


   Teste = [
       {
          "Data" : "12/11/2018 14:50",
          "Nome" : "Jefferson",
          "RG" : "00.000.000-5"
       },
       {
          "Data" : "15/11/2018 14:50",
          "Nome" : "Carlos",
          "RG" : "00.000.000-5"
       },
       {
        "Data" : "12/11/2018 14:50",
        "Nome" : "Jefferson",
        "RG" : "00.000.000-5"
       },
       {
        "Data" : "12/11/2018 14:50",
        "Nome" : "Jefferson",
        "RG" : "00.000.000-5"
      }
 
    ]

    AuxTeste = [
      {
         "Data" : "12/11/2018 14:50",
         "Nome" : "Jefferson",
         "RG" : "00.000.000-5"
      },
      {
         "Data" : "15/11/2018 14:50",
         "Nome" : "Carlos",
         "RG" : "00.000.000-5"
      },
      {
       "Data" : "12/11/2018 14:50",
       "Nome" : "Jefferson",
       "RG" : "00.000.000-5"
      },
      {
       "Data" : "12/11/2018 14:50",
       "Nome" : "Jefferson",
       "RG" : "00.000.000-5"
     }

   ]

  constructor(public navCtrl: NavController, 
              private alertController : AlertController,
              private modalController : ModalController,
              private events : Events,
              public medicalResultService : MedicalResultService,
              private loadingController : LoadingController ) {

    this.columns = [
      { prop: 'Data' },
      { prop: 'Nome' },
      { prop: 'RG' }
    ];

    events.subscribe("filterDashResults", (filterParam) => {
      let key = filterParam.Key;
      let value = filterParam.Value;

      if (key != null || value != null){
        if (key == "RG"){
          this.AuxTeste = this.Teste.filter(
            result => result.RG == value
          );
        } else if (key == "Nome"){
          this.AuxTeste = this.Teste.filter(
            result => result.Nome == value
          );
        } else {
          this.AuxTeste = this.Teste.filter(
            result => result.Data == value
          );
        }
        this.updateRowsData();
      } else {
        this.clearFilter();
      }
    });
  }

  showDashboardFilter (){
    let profileModal = this.modalController.create(DashboardFilterComponent);
    profileModal.present();
  }

  importPatient (){
    let profileModal = this.modalController.create(ImportPatientComponent);
    profileModal.present();
  }

  clearFilter (){
    this.AuxTeste = this.Teste;
    this.updateRowsData();
  }

  ionViewDidLoad() {
    
   this.updateRowsData();

   setTimeout(() => {
    this.getMedicalResults();
   }, 500);


   
  }

  updateRowsData (){
    this.rows = this.AuxTeste;
  }

  getMedicalResults (){
      return this.medicalResultService.getMedicalResults().subscribe(result => {
        var response = JSON.parse(result["_body"]);
        console.log(response);
    })
   
  }
   

  
}
