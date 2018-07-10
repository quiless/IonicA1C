/* Angular */
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

/* Native */
import { Storage } from '@ionic/storage';

/* Models */
import { UserInfo } from '../../models/userInfo'

/* Services */
import { UserInfoService } from '../../services/userInfoService'


@Component({
  selector: 'page-register-person',
  templateUrl: 'register-person.html'
})

export class RegisterPersonPage {

  userInfo = new UserInfo();

  constructor(public navCtrl: NavController, 
              private userInfoService : UserInfoService ) {
  }

  ionViewDidLoad() {
    
   
  }

  saveUserInfo (data){
    console.log(data);
    return this.userInfoService.saveUserInfo(this.userInfo).subscribe(result => {
      console.log(result);
    }, error =>{
      console.log("erro ->>" + error)
    });
  }

  
}
