/* Angular */
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';

/* Components */
import { DashboardFilterComponent } from '../../components/dashboard-filter/dashboard-filter'
import { ImportPatientComponent } from '../../components/import-patient/import-patient'


@Component({
  selector: 'page-dashboard-results',
  templateUrl: 'dashboard-results.html'
})

export class DashboardResultsPage {

  public columns : any;
  public rows : any;


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

  constructor(public navCtrl: NavController, 
              private alertController : AlertController,
              private modalController : ModalController,
              private loadingController : LoadingController ) {

    this.columns = [
      { prop: 'Data' },
      { prop: 'Nome' },
      { prop: 'RG' }
    ];
  }

  showDashboardFilter (){
    let profileModal = this.modalController.create(DashboardFilterComponent);
    profileModal.present();
  }

  importPatient (){
    let profileModal = this.modalController.create(ImportPatientComponent);
    profileModal.present();
  }

  ionViewDidLoad() {
    
    this.rows = this.Teste;
   
  }

   

  
}
