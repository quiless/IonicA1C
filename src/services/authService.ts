/* Angular */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

/* Models */
import { UrlBase } from '../models/urlBase';

/* Native */
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class AuthService {

    header = new Headers();
    options = new RequestOptions();
    url = new UrlBase().getBaseURL();
    public token = "";

    constructor(public http: Http, private storage : Storage,public events: Events){
        this.header.append('Content-Type', 'application/x-www-form-urlencoded');
        this.options = new RequestOptions({
        headers: this.header,
        }); 

    }

    authenticate(request){
        let data = "grant_type=password&username=" + request.Username + "&password=" + request.Password;
        return this.http.post("http://200.98.116.9:8086/token", data, this.options);
    }

    public userIsLogged(){
        return this.authInfo().then((data)=>{
          if(data !== undefined && data !== null){
              this.setToken(data.token);
            return true;
          }else{
            return false;
          }
        });
    }

    public authInfo(){
        return this.storage.get('authInfo');
    }

    public logout(){
        return this.storage.remove('authInfo').then(()=>{
            console.log("logout event;")
            this.events.publish('logout');
        });
    }
    public setToken(token){
        this.token = token;
    }

   

}
