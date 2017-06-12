import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {URL} from '../constants/constants';

@Component({
    selector: 'page-modalpage',
    templateUrl: 'modalpage.html',
    providers: [CafeService]
})

export class ModalPage {

    cafeDetails: {
        cafeName: string,
        location: string,
        description: string
    }

    constructor(private viewCtrl: ViewController, public http: Http, private cafeService: CafeService) {
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
            user_ref_id: localStorage.getItem("userid")
        }

        console.log(postParams.name);
        console.log(postParams.location);
        console.log(postParams.description);
        console.log(postParams.user_ref_id);

        this.cafeService.addNewCafe(postParams, URL.ADD_CAFE_URL).subscribe(data => {

            console.log(data);

           
             if (data.json.status == "SUCCESS") {

                 console.log("added successfully");

                 this.viewCtrl.dismiss("success");

             }

        }, error => {
            alert("error" + error);
            console.log(error);

        });


    }





}