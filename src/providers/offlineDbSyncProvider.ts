import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalResult } from '../models/medicalResult';

/* Native */
import { Storage } from '@ionic/storage';
import { OfflineEntity } from '../models/offlineEntity';
import { Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { MedicalResultService } from '../services/medicalResultService';
/*
  Generated class for the OfflineDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export enum ConnectionStatusEnum {
  Online,
  Offline
}


@Injectable()
export class OfflineDbSyncProvider {

  previousStatus:ConnectionStatusEnum = ConnectionStatusEnum.Offline;
  $this=this;
  promises=[];
  constructor(public http: HttpClient,
    public storage:Storage,
    public events : Events,
    public medicalResultService:MedicalResultService,
    public network: Network) {

    this.network.onDisconnect().subscribe(() => {   
      console.log("onDisconnect");   
        this.previousStatus = ConnectionStatusEnum.Offline;
        this.stopAllSyncNow();
    });
  
    this.network.onConnect().subscribe(() => {
      this.previousStatus = ConnectionStatusEnum.Online;
      this.syncData(undefined);
    });

    this.events.subscribe("dbChanged", this.syncData);
    this.events.subscribe("onConnectionChanged", this.syncData);
  }

  stopAllSyncNow(){
    this.promises.map(promise=>{
      promise.cancel();
    });
  }
  
  syncData(table){
    if( this.previousStatus == ConnectionStatusEnum.Online){
      let items=[
        {Sync:false,Data:undefined},
        {Sync:false,Data:undefined},
        {Sync:false,Data:undefined}
      ];

      items.map((item)=>{
        this.promises.push(this.medicalResultService.saveMedicalResult(item).then(result=>{
          //Atualiza o item do sync;
        }));
      });
    }
  }

}
