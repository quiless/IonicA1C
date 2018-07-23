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
import { DEFAULT_PACKAGE_URL_PROVIDER } from '@angular/platform-browser-dynamic/src/compiler_factory';

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
    
    this.storage.clear();
    
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
        spinner: 'ios'
      });

      let alert = this.alertController.create({
        buttons: ['Ok']
      });
      

      blockUi.present();

      return this.authService.authenticate(this.login).subscribe( data => {
        if (data["_body"] != null){
          let response = (JSON.parse(data["_body"]));
          this.authService.setToken(response.access_token);
            this.storage.set("userLogin", this.login).then(() => {
              this.getInformationsUserLogged(response.access_token).subscribe(result => {
                if (result["_body"] != null){
                  let response = (JSON.parse(result["_body"]));
                  this.storage.set("userInfoLogged", response);
                }
                this.redirectHome();
                blockUi.dismiss();
              }, error => {
                alert.setMessage(error);
                alert.present();
                blockUi.dismiss();
              })
            })
           
        }
       
      }, error => {
        alert.setMessage("Usuário e/ou senha são inválidos!");
        alert.present();
        blockUi.dismiss();
      });
  }

  getInformationsUserLogged (token){
    return this.userInfoService.getInformationsUserLogged(token);
  }
}
