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

import { AuthInfo } from '../../models/authInfo';

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

   ionViewCanEnter(){
    this.authService.userIsLogged().then(x=>{
      if(x)
        this.navCtrl.setRoot(HomePage);
    });   
  }
  ionViewDidLoad() {    
    /**setTimeout(() => {
      this.splash = false;
    }, 4000);**/
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
        console.log("authenticate");
        if (data["_body"] != null){
          let response = (JSON.parse(data["_body"]));

            let authInfo:AuthInfo = new AuthInfo();
            authInfo.token=response.access_token;
            authInfo.username=this.login.Username;
            authInfo.password=this.login.Password;
            this.authService.setToken(response.access_token);
            console.log("get user information")
            this.getInformationsUserLogged(response.access_token).subscribe(result => {
              if (result["_body"] != null){
                let response = (JSON.parse(result["_body"]));
                authInfo.userInfo = response;
                this.storage.set('authInfo',authInfo).then(()=>{
                  this.redirectHome();
                  blockUi.dismiss();
                },(error)=>{
                  console.log("error storage",error);

                });
              }             
            }, error => {
              alert.setMessage(error);
              alert.present();
              blockUi.dismiss();
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
