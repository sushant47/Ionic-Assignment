import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
@Injectable()
export class UrlRequestService {
    public  response: any;
    constructor(private http: Http) { }
     postRequest(postParams, url:string){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    // let postParams = {
    //   username: 'sushant',
    //   email: 'sushantbilg@gmail.com',
    //   password: '123456789'
    // }
    //alert(url);

    return this.http.post(url,postParams, options);
                        

    // this.http.post(url, postParams, options)
    //   .subscribe(data => {
    //     alert("data " + data);
    //     console.log(data['_body']);
    //     this.response = data['_body'];
    //     //return(this.response);
    //     return Promise.resolve(UrlRequestService);
    //    }, error => {
    //      alert("error" + error);
    //     console.log(error);
    //     this.response = error;
    //      return Promise.resolve(this.response);
    //   });
    //   return Promise.resolve(this.response);
  }
//     getHeroes(): Promise<Hero[]> {
//     return this.http.get(this.heroesUrl)
//                .toPromise()
//                .then(response => response.json().data as Hero[])
//                .catch(this.handleError);
//   }

//  return this.http.post(url, postParams, options)
//    .toPromise().then(response => response.json().data).catch(this.handleError);

 private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("obervable" + errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}