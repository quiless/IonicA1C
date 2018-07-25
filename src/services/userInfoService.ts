/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

/* Models */
import { UrlBase } from '../models/urlBase'

/* Native */
import { Storage } from '@ionic/storage';

/* Services */
import { AuthService } from '../services/authService';

@Injectable()
export class UserInfoService {

    header = new Headers();
    options = new RequestOptions();
    url = 'http://200.98.116.9:8086/api/';//new UrlBase().getBaseURL();
    token = "";

    constructor(private http: HttpClient, private storage : Storage, private httpAngular : Http, private authService : AuthService){
        this.header.append('Access-Control-Allow-Origin' , '*');
        this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.header.append('Accept','application/json');
        this.header.append('content-type','application/json');
        this.options = new RequestOptions({
        headers: this.header,
        });

        
    }

    saveUserInfo(data){
        return this.http.post(this.url + "Core/SaveUserInfo",JSON.stringify(data));
    }

    getInformationsUserLogged(data){
        this.options.headers.append('Authorization', 'Bearer ' + data);
        return this.httpAngular.post(this.url + "Core/GetUserInfoPersonLogged", null, this.options);
    }

    saveTextConfig(lstTextConfig){
        return this.http.post(this.url + "Core/SaveTextConfig", lstTextConfig);
    }

    getUserTextConfig(){
        return this.http.post(this.url + "Core/GetUserTextConfig", {});
    }

    public resetUserInfoTextConfig(){
       
        return this.http.post(this.url + "Core/ResetTextConfig", {}).subscribe( result => {

        }, error => {
            console.log(error);
        });
    }

}
