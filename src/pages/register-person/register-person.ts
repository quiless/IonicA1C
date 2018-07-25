/* Angular */
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

/* Native */
import { Storage } from '@ionic/storage';

/* Models */
import { UserInfo } from '../../models/userInfo'

/* Services */
import { UserInfoService } from '../../services/userInfoService'

/* Views */
import { LoginPage } from '../../pages/login/login'

/* External */
import {BrMaskModel } from 'brmasker-ionic-3';


@Component({
  selector: 'page-register-person',
  templateUrl: 'register-person.html'
})

export class RegisterPersonPage {

  userInfo = new UserInfo();
  
  genders = [
    { "Name" : "Masculino", "Value" : 0}, 
    { "Name" : "Feminino", "Value" : 1}
  ];


  constructor(public navCtrl: NavController, 
              private userInfoService : UserInfoService,
              private alertController : AlertController,
              private loadingController : LoadingController ) {
  }

  ionViewDidLoad() {
    
   
  }

   redirectLoginPage(){
    this.navCtrl.push(LoginPage);
  } 


  saveUserInfo (data){

    let blockUi = this.loadingController.create({
      spinner: 'ios'
    });

    let alert = this.alertController.create({
      buttons: ['Ok']
    });

    blockUi.present();

    return this.userInfoService.saveUserInfo(this.userInfo).subscribe(result => {
      blockUi.dismiss().then(() => {
        alert.setMessage("Usuário cadastrado com sucesso!");
        alert.present().then(() => {
          this.redirectLoginPage();
        })
      })
    }, error =>{
      blockUi.dismiss().then(() => {
        let stringMessageError = "";

        error.error.forEach(function(value){
          stringMessageError += value + "; <br>";
        });

        stringMessageError = stringMessageError.split(";").join("; \n")
        alert.setMessage(stringMessageError);
        alert.present();
      });
    });
  }

 

  
}
