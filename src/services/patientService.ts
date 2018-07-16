/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

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

    constructor(private http: Http, private storage : Storage){
        this.header.append('Access-Control-Allow-Origin' , '*');
        this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.header.append('Accept','application/json');
        this.header.append('content-type','application/json');
        this.options = new RequestOptions({
        headers: this.header,
        });

    }

    getToken(){
        this.storage.get("access_token").then((result) => {
            this.token = result;
        });
    }

    savePatient(patient){
        this.options.headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post(this.url + "Core/SavePatient", patient, this.options );
    }

    getPatientByRG(RG){
        console.log(RG);
        this.options.headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post(this.url + "Core/GetPatientByRG", JSON.stringify(RG), this.options );
    }

}
