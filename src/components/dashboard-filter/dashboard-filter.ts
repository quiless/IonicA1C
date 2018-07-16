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
  selector: 'dashboard-filter',
  templateUrl: 'dashboard-filter.html'
})

export class DashboardFilterComponent {


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