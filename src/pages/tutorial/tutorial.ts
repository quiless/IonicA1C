/* Angular */

import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/* Views */
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController
            ) {

             
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
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }
  }

  slidePrev(index){
    if (index == 0){
      this.navCtrl.push(HomePage);
    } else {
      this.slides.lockSwipes(false);
      this.slides.slidePrev();  
      this.slides.lockSwipes(true);
    }
  }

 
}
