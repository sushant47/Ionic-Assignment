import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {URL} from '../constants/constants';
import { UserInputData } from '../userinputdata/UserInputData';

declare var google;

@Component({
    selector: 'page-modalpage',
    templateUrl: 'modalpage.html',
    providers: [CafeService]
})

export class ModalPage implements OnInit {

    

    userInputData: UserInputData = {};

    constructor(private viewCtrl: ViewController, public http: Http, private cafeService: CafeService) {
       
    }



    dismiss(data) {
        console.log("data " + data);
        this.viewCtrl.dismiss(data);
        google.maps.event.clearInstanceListeners(document.getElementById('journey_from'));
    }

    addCafe(): void {

         google.maps.event.clearInstanceListeners(document.getElementById('journey_from'));
        let postParams = {
            name: this.userInputData.cafeName,
            location: this.userInputData.location,
            description: this.userInputData.description,
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

loading(){
   //get the two fields
    let input_from = (<HTMLInputElement>document.getElementById('journey_from'));
    console.log(input_from);
    //let input_to = (<HTMLInputElement>document.getElementById('journey_to'));

    // set the options
    let options = {
      types: [],
      componentRestrictions: { country: "IND" }
    };

    // create the two autocompletes on the from and to fields
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    //let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {

      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {

        console.log(place.name);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());

      }
    });
}


ngOnInit(): void {
   
  
  


  }

   ngAfterViewInit(): void {

//alert("loaded");
 //get the two fields
    let input_from = document.getElementById('journey_from').getElementsByTagName('input')[0];
    //let input_to = (<HTMLInputElement>document.getElementById('journey_to'));

    // set the options
    let options = {
      types: [],
      componentRestrictions: { country: "IND" }
    };

    // create the two autocompletes on the from and to fields
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    //let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {

      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {

        console.log(place.name);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());

      }
    });

  }

}