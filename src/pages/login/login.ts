/* Angular */

import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

/* Services */
import { AuthService } from '../../services/authService';
import { UserInfoService } from '../../services/userInfoService';

/* Models */
import { Login } from '../../models/login';

/* Native */
import { Storage } from '@ionic/storage';


/* Views */
import { RegisterPersonPage } from '../register-person/register-person';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents:[RegisterPersonPage, HomePage]
})

export class LoginPage {

  splash = true;
  login = new Login();

  constructor(public navCtrl: NavController, 
              private loadingController : LoadingController, 
              private alertController : AlertController,
              private authService : AuthService,
              private userInfoService : UserInfoService,
              private storage : Storage
            ) {
  }

  ionViewDidLoad() {
    
    setTimeout(() => {
      this.splash = false;
    }, 4000);

  }

  redirectRegisterPerson(){
    this.navCtrl.push(RegisterPersonPage);
  }

  redirectHome(){
    this.navCtrl.push(HomePage);
  }



  signIn(){
      let blockUi = this.loadingController.create({
        spinner: 'ios',
        duration: 2000
      });

      let alert = this.alertController.create({
        buttons: ['Ok']
      });
      

      blockUi.present();

      return this.authService.authenticate(this.login).subscribe( data => {
        let response = (JSON.parse(data["_body"]));
        this.storage.set("access_token", response.access_token);
        this.storage.set("userLogin", this.login);
        this.getInformationsUserLogged().subscribe(result => {
          let response = (JSON.parse(result["_body"]));
          this.storage.set("userInfoLogged", response);
          this.redirectHome();
        }, error => {
          alert.setMessage(error);
        })
      }, error => {
        alert.setMessage("Usuário e/ou senha são inválidos!");
        alert.present();
        blockUi.dismiss();
      });
  }

  getInformationsUserLogged (){
    return this.userInfoService.getInformationsUserLogged();
  }
}
