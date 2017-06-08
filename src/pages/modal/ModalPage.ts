import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UrlRequestService } from '../services/url-request.service';

export class CafeDetails {
    public name: string;
    public location: string;
    public description: string;
}

@Component({
    selector: 'page-modalpage',
    templateUrl: 'modalpage.html',
     providers: [UrlRequestService]
})

export class ModalPage {

cafeDetails:  {
     name: string;
     location: string;
     description: string;
}



    //cafeDetails: CafeDetails = new CafeDetails();
    constructor(private viewCtrl: ViewController) {
    }

    dismiss(data) {
        console.log("data " + data);
        this.viewCtrl.dismiss(data);
    }

   addCafe(): void {

       alert("added");

    }

    

  

}