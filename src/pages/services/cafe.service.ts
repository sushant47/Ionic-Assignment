import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import {HttpService} from './http.service';
@Component({
   providers: [HttpService]
})
@Injectable()
export class CafeService {
    public  response: any;
    constructor(private http: Http, private httpService: HttpService) { }
     


getAllCafeList(postParams, url:string){
       
   
   return this.httpService.post(postParams, url);

  }

  addNewCafe(postParams, url:string){
       
    
   return this.httpService.post(postParams, url);
    
  }


}