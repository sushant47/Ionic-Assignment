import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { HttpService } from './http.service';
@Component({
  providers: [HttpService]
})
@Injectable()
export class UserService {
  public response: any;
  constructor(private http: Http, private httpService: HttpService) { }
  postRequest(postParams, url: string) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    postParams = JSON.stringify(postParams);
    return this.http.post(url, postParams, options);
  }


  login(postParams, url: string) {

    console.log(postParams.email);
    console.log(postParams.password);
    return this.httpService.post(postParams, url);

  }

  signup(postParams, url: string) {

    console.log(postParams.email);
    console.log(postParams.password);
    return this.httpService.post(postParams, url);

  }

}