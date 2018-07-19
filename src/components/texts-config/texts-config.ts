/* Angular */
import { Component, Input } from '@angular/core';
import { NavController, 
        LoadingController, 
        AlertController, 
        ModalController,
        ToastController, 
        ViewController,
        Events } from 'ionic-angular';

/* Native */
import { Storage } from '@ionic/storage';


@Component({
  selector: 'texts-config',
  templateUrl: 'texts-config.html'
})

export class TextsConfigComponent {

  text2 = "";
  text3 = "";


  constructor(
    private loadingController : LoadingController,
    private toastController : ToastController,
    private viewController : ViewController,
    private storage : Storage,
    private modalController : ModalController, 
    private events : Events) { 
  }

  dismiss(){
    this.storage.set("text2", this.text2).then(() => {
      this.storage.set("text3", this.text3).then(() => { 
       this.viewController.dismiss();
      })
    })
  }

  cancel(){
    this.viewController.dismiss();
  }



  
  

}