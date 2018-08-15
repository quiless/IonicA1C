import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalResult } from '../models/medicalResult';

/* Native */
import { Storage } from '@ionic/storage';
import { OfflineEntity } from '../models/offlineEntity';
import { Events } from 'ionic-angular';
/*
  Generated class for the OfflineDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfflineDbProvider {

  constructor(public http: HttpClient,public storage:Storage,public events : Events) {
    console.log('Hello OfflineDbProvider Provider');
  }

  saveMedicalResult(entity:MedicalResult){
    return this.storage.get("medicalResults").then((data)=>{
        if(data ==undefined)
          data=[];

        data.push({
          Sync:true,
          Data:entity
        });     
          
        return this.storage.set("medicalResults",data).then(x=>{
          this.events.publish("dbChanged", "medicalResults");
        });
    });
  }
}
