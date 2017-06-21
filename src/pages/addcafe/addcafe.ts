import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SegmentPage } from '../segment/segment';
import 'rxjs/add/operator/map';
import { URL } from '../constants/constants';
import { UserInputData } from '../userinputdata/UserInputData';
import { HttpService } from '../services/http.service';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-addcafe',
  templateUrl: 'addcafe.html',
  providers: [CafeService, HttpService]
})

export class AddCafe{

  myLong: number;
  myLat: number;
  map: any;
  autocompleteItems;
  autocomplete;
  userInputData: UserInputData = {};
  coordinates:any;
  constructor(public geolocation: Geolocation, private cafeService: CafeService, private zone: NgZone, private viewCtrl: ViewController, public httpService: HttpService) {
   // this.loadMap();
    //console.log(this.params.get('mapAddress'));
    //this.coordinates = this.params.get('mapAddress');
    // if (this.coordinates != undefined) {
    //   console.log("location coordinates " + coordinates.lat);
    //   this.userInputData.location = {
    //     name: '',
    //     lat: coordinates.lat,
    //     lng: coordinates.lng
    //   };

    //   console.log("location coordinates set " + this.userInputData.location);
    // }
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

  }
 ionViewDidLoad() {
    console.log('ionViewDidLoad SegmentPage');
    this.loadMap();

  }
loadMap() {
alert("map");
    this.geolocation.getCurrentPosition().then((resp) => {

      
      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
      let location = new LatLng(this.myLat, this.myLong);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  addCafe(): void {

    if (this.coordinates != undefined) {
      console.log("location coordinates " + this.coordinates.lat);
      this.userInputData.location = {
        name: this.userInputData.cafeName,
        lat: this.coordinates.lat,
        lng: this.coordinates.lng
      };

      console.log("location coordinates set " + this.userInputData.location);
    }
    // google.maps.event.clearInstanceListeners(document.getElementById('journey_from'));
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
dismiss(data) {
    console.log("data " + data);
    this.viewCtrl.dismiss(data);
    //google.maps.event.clearInstanceListeners(document.getElementById('journey_from'));
  }
  loading() {
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
  chooseItem(item: any) {
   // alert("choosen");
    console.log("item " + item);
    this.userInputData.location = item;
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    console.log("query " + this.autocomplete.query);
    this.autocompleteItems = [];
    //let predictions: any = [];
    let url: string = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + this.autocomplete.query + "&types=establishment&components=country:ind&location=18.5204,73.8567&key=AIzaSyARBYHwwK5uPoNuS2iN3UOg8fQGRgHLz78";
    this.httpService.post("", url).subscribe(data => {
      //alert("data " + data);
      // console.log(data['_body']);
      // var stat = data['_body'];
      // stat = JSON.parse(data['_body']);
      console.log(data);
      console.log(data.json);
      console.log(data.json.predictions[0].description);

      me.zone.run(function () {
        data.json.predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });

      if (data.json.status == "SUCCESS") {

        console.log("success");

      }

    }, error => {
      alert("error" + error);
      console.log(error);

    });

    //  this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: { country: 'IND' } }, function (predictions, status) {
    //         if (status != google.maps.places.PlacesServiceStatus.OK) {
    //             alert(status);
    //             return;
    //         }
    //         me.autocompleteItems = [];
    //   me.zone.run(function () {
    //     predictions.forEach(function (prediction) {
    //       me.autocompleteItems.push(prediction.description);
    //     });
    //   });
    // });
  }

 

}