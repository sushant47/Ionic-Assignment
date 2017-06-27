import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SegmentPage } from '../segment/segment';
import 'rxjs/add/operator/map';
import { URL, MAPS_URL } from '../constants/constants';
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

export class AddCafe {

  locationCoordinates: any;
  myLong: number;
  myLat: number;
  public mapview: any;
  autocompleteItems;
  autocomplete;
  userInputData: UserInputData = {};
  coordinates: any;
  constructor(public geolocation: Geolocation, private cafeService: CafeService, private zone: NgZone, private viewCtrl: ViewController, public httpService: HttpService) {

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
    console.log("map");
    this.geolocation.getCurrentPosition().then((resp) => {


      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
      let location = new LatLng(this.myLat, this.myLong);

      this.mapview = new GoogleMap('mapview', {
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

      this.mapview.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  addCafe(): void {
    let postParams = {
      name: this.userInputData.cafeName,
      location: JSON.stringify(this.userInputData.location),
      description: this.userInputData.description,
      user_ref_id: localStorage.getItem("userid")
    }

    console.log(postParams.name);
    console.log(postParams.location);
    console.log(postParams.description);
    console.log(postParams.user_ref_id);

    this.cafeService.addNewCafe(postParams, URL.ADD_CAFE_URL).subscribe(data => {

      console.log(data);


      if (data.status == "SUCCESS") {

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
    this.mapview.remove();

  }

  chooseItem(item: any) {

    console.log("item " + item);
    this.autocompleteItems = [];
    console.log("url " + MAPS_URL.GET_LOCATION_URL + item + MAPS_URL.API_KEY);
    this.httpService.post("", MAPS_URL.GET_LOCATION_URL + item + MAPS_URL.API_KEY).subscribe(data => {

      console.log(data);
      console.log(data.results[0].formatted_address);
      let ionic: LatLng = new LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
      this.userInputData.location = {
        name: data.results[0].formatted_address,
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      };

      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      this.mapview.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: ionic,
        title: this.userInputData.cafeName,
        draggable: true
      };

      this.mapview.addMarker(markerOptions)
        .then(
        (marker: Marker) => {
          console.log("marker");
          marker.showInfoWindow();
          marker.on(GoogleMapsEvent.MARKER_DRAG_END)
            .subscribe(() => {
              marker.getPosition()
                .then((position: LatLng) => {
                  this.locationCoordinates = position;
                  console.log("reverseGeocodeUrl " + MAPS_URL.REVERESE_GEOCODE_URL + position.lat + "," + position.lng + MAPS_URL.API_KEY);
                  this.reverseGeoCode(MAPS_URL.REVERESE_GEOCODE_URL + position.lat + "," + position.lng + MAPS_URL.API_KEY, position.lat, position.lng);
                  console.log(this.locationCoordinates.lat);
                  console.log(this.locationCoordinates.lng);
                  console.log('Marker was moved to the following position: ', position);
                });
            });
        }
        );

    }, error => {
      alert("error" + error);
      console.log(error);

    });

  }

  reverseGeoCode(reverseGeocodeUrl, lattitude, longitude) {
    this.httpService.post("", reverseGeocodeUrl).subscribe(data => {
      console.log(data);
      console.log(data);
      console.log(data.results[0].formatted_address);
      this.userInputData.location = {
        name: data.results[0].formatted_address,
        lat: lattitude,
        lng: longitude
      };
      console.log("user input location " + this.userInputData.location);
      let ionic: LatLng = new LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
    });
  }
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    console.log("query " + this.autocomplete.query);
    this.autocompleteItems = [];
    console.log("url " + MAPS_URL.AUTOCOMPLETE_URL + this.autocomplete.query + MAPS_URL.AUTOCOMPLETE_URL_PARAMETERS);
    this.httpService.post("", MAPS_URL.AUTOCOMPLETE_URL + this.autocomplete.query + MAPS_URL.AUTOCOMPLETE_URL_PARAMETERS).subscribe(data => {
      console.log(data);
      console.log(data.predictions[0].description);

      me.zone.run(function () {
        data.predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });

      if (data.status == "SUCCESS") {

        console.log("success");

      }

    }, error => {
      alert("error" + error);
      console.log(error);

    });

  }



}