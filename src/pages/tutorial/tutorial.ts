/* Angular */

import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/* Views */
import { HomePage } from '../home/home';
import { AuthService } from '../../services/authService';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})


export class TutorialPage {

  @ViewChild(Slides) slides: Slides;

  videos =  [
    {
      "videoUri": "assets/videos/COleta1_18.mp4",
      "ended":false
    },
    {
      "videoUri": "assets/videos/Coleta2_18.mp4",
      "ended":false
    },
    {
      "videoUri": "assets/videos/Coleta3_18.mp4",
      "ended":false
    }
  ]

  videoSrc:string;

  constructor(public navCtrl: NavController,
              private authService:AuthService,
              private storage : Storage
            ) {

             
  }

  ionViewCanEnter(){
    this.authService.userIsLogged().then(x=>{
      if(!x)
        this.navCtrl.setRoot(LoginPage);
    });   
  }

  ionViewDidLoad() {
   this.slides.lockSwipes(true);
  }

  endedVideo(index){
    console.log("The video has just ended!");
    this.videos[index].ended=true;
  }
  
  slideNext(index){
   
    if (index == 2){
      this.navCtrl.push(HomePage);
    } else {

      var video = document.getElementsByTagName("video")[index+1];
      video.pause();
      video.currentTime = 0;
      video.play();
      
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }
  }

  slidePrev(index){
   
    if (index == 0){
      this.navCtrl.push(HomePage);
    } else {
      var video = document.getElementsByTagName("video")[index-1];
      video.pause();
      video.currentTime = 0;
      video.play();

      this.slides.lockSwipes(false);
      this.slides.slidePrev();  
      this.slides.lockSwipes(true);
    }
  }

}
