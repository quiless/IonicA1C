/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

/* Models */
import { UrlBase } from '../models/urlBase'

/* Native */
import { Storage } from '@ionic/storage';


@Injectable()
export class MedicalResultService {

    header = new Headers();
    options = new RequestOptions();
    url = 'http://200.98.116.9:8086/api/';//new UrlBase().getBaseURL();

    constructor(private storage : Storage, public http : HttpClient){
        this.header.append('Access-Control-Allow-Origin' , '*');
        this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.header.append('Accept','application/json');
        this.header.append('content-type','application/json');
        this.options = new RequestOptions({
        headers: this.header,
        });


    }
    
    saveMedicalResult(medicalResult){
        var x = this.http.post(this.url + "Core/SaveMedicalResult", medicalResult);
  
        return x;

    }


    sendMedicalResultSMSEmail(medicalResult){
        var x = this.http.post(this.url + "Core/SendMedicalResultSMSEmail", medicalResult);
  
        return x;

    }
    

    getMedicalResults(){
        return this.http.post(this.url + "Core/GetMedicalResults", {});
    }

    importMedicalResults(patientRG : string){
        return this.http.post(this.url + "Core/ImportMedicalResults", JSON.stringify(patientRG));
    }
}
