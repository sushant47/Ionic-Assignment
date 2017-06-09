import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UrlRequestService } from '../services/url-request.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-modalpage',
    templateUrl: 'modalpage.html',
    providers: [UrlRequestService]
})

export class ModalPage {

    cafeDetails: {
        cafeName: string,
        location: string,
        description: string
    }

    constructor(private viewCtrl: ViewController, public http: Http, private urlRequestService: UrlRequestService) {
        this.cafeDetails = {
            cafeName: '',
            location: '',
            description: ''
        }
    }

    

    dismiss(data) {
        console.log("data " + data);
         this.viewCtrl.dismiss(data);
    }
        
   addCafe(): void {

      let postParams = {
      name: this.cafeDetails.cafeName,
      location: this.cafeDetails.location,
      description: this.cafeDetails.description,
      user_ref_id:localStorage.getItem("userid")
    }

    console.log(postParams.name);
    console.log(postParams.location);
    console.log(postParams.description);
    console.log(postParams.user_ref_id);

    let url: string = 'https://extcafe.herokuapp.com/api/addCafe';
    
    this.urlRequestService.postRequest(postParams, url).subscribe(data => {
     
      console.log(data['_body']);
      var stat = data['_body'];
      stat = JSON.parse(data['_body']);;
      console.log(stat.status);
      if (stat.status == "SUCCESS") {

        console.log("added successfully");
        
        this.viewCtrl.dismiss();

      }
      
    }, error => {
      alert("error" + error);
      console.log(error);
     
    });
    

    }

    

  

}