/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

/* Models */
import { UrlBase } from '../models/urlBase'

/* Native */
import { Storage } from '@ionic/storage';


@Injectable()
export class PatientService {

    header = new Headers();
    options = new RequestOptions();
    url = new UrlBase().getBaseURL();
    token = "";

    constructor(private http: HttpClient, private storage : Storage){
       
    }

    savePatient(patient){
        return this.http.post(this.url + "Core/SavePatient", patient);
    }

    getPatientByRG(RG){
        return this.http.post(this.url + "Core/GetPatientByRG", JSON.stringify(RG));
    }

}
