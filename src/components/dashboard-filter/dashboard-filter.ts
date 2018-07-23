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

  filterObject = {
    Key : "",
    Value : ""
  }

  filterProperties = ["RG", "Nome", "Email"];


  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private viewController : ViewController,
    private modalController : ModalController, 
    private events : Events) { 
  }

  dismiss(){
    return this.viewController.dismiss();
  }

  
  filter(){
    this.events.publish("filterDashResults", this.filterObject);
    return this.viewController.dismiss();
  }


  
  

}