import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UrlRequestService } from '../services/url-request.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { ModalController, NavParams } from 'ionic-angular';
import { ModalPage } from '../modal/modalpage';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;


let Title: string;
let Msg: string;
let btn: string;
let user_id: string;


@Component({
  selector: 'page-cafelocation',
  templateUrl: 'cafelocation.html',
  providers: [UrlRequestService]
})

export class CafeLocation implements OnInit {


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  fromValue: string;
  toValue: string;
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    this.fromValue = '';
    this.toValue = '';
    this.loadMap();
  }

  ionViewDidLoad() {
    this.loadMap();
  }
  ionSelected() {
    // alert("loading map");
    this.loadMap();

  }
  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log("inside map");
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  ngOnInit(): void {
    // get the two fields
let input_from = (<HTMLInputElement>document.getElementById('journey_from'));
let input_to = (<HTMLInputElement>document.getElementById('journey_to'));

// set the options
let options = {
types: [],
componentRestrictions: {country: "IND"}
};

// create the two autocompletes on the from and to fields
let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
//let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

// we need to save a reference to this as we lose it in the callbacks
let self = this;

// add the first listener
google.maps.event.addListener(autocomplete1, 'place_changed', function() {

let place = autocomplete1.getPlace();
let geometry = place.geometry;
if ((geometry) !== undefined) {

console.log(place.name);

console.log(geometry.location.lng());

console.log(geometry.location.lat());

}});

// // add the second listener
// google.maps.event.addListener(autocomplete2, 'place_changed', function() {
// let place = autocomplete2.getPlace();
// let geometry = place.geometry;

// if ((geometry) !== undefined) {

// console.log(place.name);

// console.log(geometry.location.lng());

// console.log(geometry.location.lat());

// }});


  }


  //constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http, private urlRequestService: UrlRequestService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  // this.postRequest();
  //}


  // presentToast() {
  //     let toast = this.toastCtrl.create({
  //         message: 'Extentia Cafe Outlet Added Successfully',
  //         duration: 2000,
  //         position: 'bottom'
  //     });
  //     toast.present();
  // }

  // presentModal() {

  //     let that = this;
  //     let modal = this.modalCtrl.create(ModalPage);
  //     modal.present();

  //     modal.onDidDismiss(data => {
  //         console.log(data);
  //         that.presentToast();
  //         that.postRequest();
  //      });

  // }

  // postRequest() {

  //     console.log(localStorage.getItem("userid"));
  //     let postParams = {
  //         userid: user_id
  //     }

  //     if ("userid" in localStorage) {

  //         user_id = localStorage.getItem("userid");
  //         console.log("reached");
  //         let url: string = 'https://extcafe.herokuapp.com/api/getCafeList';

  //         this.urlRequestService.postRequest(postParams, url).subscribe(data => {

  //             console.log(data['_body']);
  //             var stat = data['_body'];
  //             stat = JSON.parse(data['_body']);;
  //             console.log(stat.status);
  //             console.log(stat.cafeList[0]);
  //             console.log(stat.cafeList);

  //             if (stat.status == "SUCCESS") {


  //                 this.items = stat.cafeList;

  //             }

  //         }, error => {
  //             alert("error" + error);
  //             console.log(error);

  //         });


  //     }

  //     else {

  //         console.log("else part");
  //         this.navCtrl.push(Login);
  //     }




  // }
  // showAlert() {
  //     let alert = this.alertCtrl.create({
  //         title: Title,
  //         subTitle: Msg,
  //         buttons: [btn]
  //     });
  //     alert.present();
  // }

  // addNewCafe(): void {

  //     this.presentModal();

  // }


}