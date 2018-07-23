/* Angular */
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController, Events, ActionSheetController } from 'ionic-angular';

/* Components */
import { DashboardFilterComponent } from '../../components/dashboard-filter/dashboard-filter'
import { ImportPatientComponent } from '../../components/import-patient/import-patient'

/* Services */
import { MedicalResultService } from '../../services/medicalResultService'

/* Viwes */
import { MedicalResultsPage } from '../../pages/medical-results/medical-results'
import { HomePage } from '../../pages/home/home'

@Component({
  selector: 'page-dashboard-results',
  templateUrl: 'dashboard-results.html'
})

export class DashboardResultsPage {

  public columns : any;
  public rows : any;
  
  MedicalResults = [];
  AuxMedicalResults = [];
   

  constructor(public navCtrl: NavController, 
              private alertController : AlertController,
              private modalController : ModalController,
              private events : Events,
              private actionSheetCtrl: ActionSheetController,
              private medicalResultService : MedicalResultService,
              private loadingController : LoadingController ) {
             
            
             this.navCtrl.remove(4);
             
             this.navCtrl.remove(3);
    


    events.subscribe("filterDashResults", (filterParam) => {
      console.log(filterParam);
      let key = filterParam.Key;
      let value = filterParam.Value;
      console.log(key,value);
      if (key != null || value != null){
        if (key == "RG"){
          this.AuxMedicalResults = this.MedicalResults.filter(
            result => result.Patient.RG == value
          );
        } else if (key == "Nome"){
          this.AuxMedicalResults = this.MedicalResults.filter(
            result => result.Patient.Name == value
          );
        } else {
          this.AuxMedicalResults = this.MedicalResults.filter(
            result => result.CreateDate == value
          );
        }
      } else {
        this.clearFilter();
      }
    });

    events.subscribe("importPatient", () => {
      this.getMedicalResults();
    })
    
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ações do Resultado',
      buttons: [      
        {
          text: 'Importar paciente',
          handler: () => {
            this.importPatient();
          }
        },
        {
          text: 'Filtrar dados',
          handler: () => {
            this.showDashboardFilter();
          }
        },
        {

          text: 'Limpar Filtro',
          handler: () => {
            this.clearFilter();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { 
          }
        }
      ]
    });
 
    actionSheet.present();
  };

  showDashboardFilter (){
    let profileModal = this.modalController.create(DashboardFilterComponent);
    profileModal.present();
  }

  importPatient (){
    let profileModal = this.modalController.create(ImportPatientComponent);
    profileModal.present();
  }

  clearFilter (){
    this.AuxMedicalResults = this.MedicalResults;
  }

  ionViewDidLoad() {
    

   setTimeout(() => {
    this.getMedicalResults();
   }, 500);


   
  }
  getMedicalResults (){
      return this.medicalResultService.getMedicalResults().subscribe((result : any[]) => {
         this.MedicalResults = result;
         this.AuxMedicalResults = result;
      })
  }

  redirectResult (Result){
    console.log(Result);
    this.navCtrl.push(MedicalResultsPage, {Result : Result });
  }
   

  
}
