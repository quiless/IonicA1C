/* Angular */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

/* rxjs */
import { Observable } from 'rxjs/Observable';

/* Services */
import { AuthService } from '../services/authService'

/* Native */
import { Storage } from '@ionic/storage';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public authService : AuthService) {}


    intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        request = request.clone({
        setHeaders: {
            Authorization: "Bearer " + this.authService.token,
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        }
        
        });
        
        console.log(request);
        return next.handle(request).catch(err => { 
            if(err.status == 401){
                this.authService.logout();
            }
            return Observable.throw(err);
        });
    }

}



export class Interceptor {

    
}