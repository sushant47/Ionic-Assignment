import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
@Injectable()
export class HttpService {
    public response: any;
    constructor(private http: Http) { }
    postRequest(postParams, url: string) {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        postParams = JSON.stringify(postParams);
        return this.http.post(url, postParams, options);

    }


    post(postParams, url: string) {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, postParams, options)
            .map((res: Response) => res.json())

    }

}
