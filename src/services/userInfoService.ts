/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

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
    url = new UrlBase().getBaseURL();
    token = "";

    constructor(private http: Http, private storage : Storage, private authService : AuthService){
        this.header.append('Access-Control-Allow-Origin' , '*');
        this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.header.append('Accept','application/json');
        this.header.append('content-type','application/json');
        this.options = new RequestOptions({
        headers: this.header,
        });

        this.getToken();
        
    }

    getToken(){
        this.storage.get("access_token").then((result) => {
            this.token = result;
        });
    }

    saveUserInfo(data){
        return this.http.post(this.url + "Core/SaveUserInfo",JSON.stringify(data), this.options);
    }

    getInformationsUserLogged(){
        this.options.headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.post(this.url + "Core/GetUserInfoPersonLogged", null, this.options );
    }


}
