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
      "videoUri": "https://media.giphy.com/media/kKefeMw8rbMVq/giphy.mp4"
    },
    {
      "videoUri": "https://media.giphy.com/media/kKefeMw8rbMVq/giphy.mp4"
    },
    {
      "videoUri": "https://media.giphy.com/media/kKefeMw8rbMVq/giphy.mp4"
    }
  ]

  constructor(public navCtrl: NavController
            ) {
  }

  ionViewDidLoad() {
   
  }

  
  slideNext(index){
    if (index == 2){
      this.navCtrl.push(HomePage);
    } else {
      this.slides.slideNext();
    }
  }

  slidePrev(index){
    if (index == 0){
      this.navCtrl.push(HomePage);
    } else {
      this.slides.slidePrev();  
    }
  }

 
}
