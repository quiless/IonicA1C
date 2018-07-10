/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

/* Models */
import { UrlBase } from '../models/urlBase'
import { Token } from '../models/token';

/* Native */
//import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

    header = new Headers();
    options = new RequestOptions();
    url = new UrlBase().getBaseURL();
    token = "";

    constructor(public http: Http){
        this.header.append('Content-Type', 'application/x-www-form-urlencoded');
        this.options = new RequestOptions({
        headers: this.header,
        }); 
    }

    authenticate(request){
        let data = "grant_type=password&username=" + request.Username + "&password=" + request.Password;
        return this.http.post("https://A1CNOW.azurewebsites.net/token", data, this.options);
    }

   

}
