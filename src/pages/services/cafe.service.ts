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
       
   
   return this.httpService.post(postParams, url).map(data => {
      //alert("data " + data);
      // console.log(data['_body']);
      // var stat = data['_body'];
      // stat = JSON.parse(data['_body']);
      console.log("cafe service" + data.json);

      if (data.json.status == "SUCCESS") {

        console.log("signup service");    
       
        return data;
        //this.navCtrl.push(TabsPage);

      }
      //this.response = data['_body'];
      //return(this.response);
      //return Promise.resolve(UrlRequestService);
    }, error => {
      alert("error" + error);
      console.log(error);
      //this.response = error;
      //return Promise.resolve(this.response);
    });

    // return this.http.post(url,postParams, options).map((res: Response) => {
    //         if (res) {
    //             return { status: res.status, json: res.json() }
    //         }
    //     });
                        

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

  addNewCafe(postParams, url:string){
       
    
   return this.httpService.post(postParams, url).map(data => {
      //alert("data " + data);
      // console.log(data['_body']);
      // var stat = data['_body'];
      // stat = JSON.parse(data['_body']);
      console.log("signup" + data.json);

      if (data.json.status == "SUCCESS") {

        console.log("signup service");    
       
        return data;
        //this.navCtrl.push(TabsPage);

      }
      //this.response = data['_body'];
      //return(this.response);
      //return Promise.resolve(UrlRequestService);
    }, error => {
      alert("error" + error);
      console.log(error);
      //this.response = error;
      //return Promise.resolve(this.response);
    });

    // return this.http.post(url,postParams, options).map((res: Response) => {
    //         if (res) {
    //             return { status: res.status, json: res.json() }
    //         }
    //     });
                        

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