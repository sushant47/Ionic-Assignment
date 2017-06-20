import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { URL } from '../constants/constants';
import { Login } from '../login/login';
import { ModalPage } from '../modal/modalpage';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { HttpService } from '../services/http.service';

declare var google;

let Title: string;
let Msg: string;
let btn: string;
let user_id: string;
let mapMarker: any;


@Component({
  selector: 'page-segment',
  templateUrl: 'segment.html',
  providers: [CafeService, HttpService]
})
export class SegmentPage implements OnInit {
  defaultZoom: any;
  onLocationSelected: any;
  myLong: number;
  myLat: number;
  address;
  locationCoordinates: any;
  map: any;
  fromValue: string;
  toValue: string;
  public items: any;
  cat: string = "cafelist";
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public httpService: HttpService, public toastCtrl: ToastController, public geolocation: Geolocation, public navParams: NavParams, public cafeService: CafeService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.fromValue = '';
    this.toValue = '';
    {
      this.address = {
        place: ''
      };
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Extentia Cafe Outlet Added Successfully',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  presentModal() {

    let that = this;
    let modal = this.modalCtrl.create(ModalPage,{mapAddress:this.locationCoordinates});
    modal.present();

    modal.onDidDismiss(data => {
      if (data == "success") {
        that.presentToast();
        that.postRequest();
      }
      else if (data != undefined) {

        console.log("data " + data);
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + data + "&key=AIzaSyARBYHwwK5uPoNuS2iN3UOg8fQGRgHLz78";

        console.log(this.address.place);
        this.httpService.post("", url).subscribe(data => {

          console.log(data);
          console.log(data.json);
          console.log(data.json.results[0].formatted_address);
          let ionic: LatLng = new LatLng(data.json.results[0].geometry.location.lat, data.json.results[0].geometry.location.lng);
          console.log(data.json.results[0].geometry.location.lat);
          console.log(data.json.results[0].geometry.location.lng);
          let position: CameraPosition = {
            target: ionic,
            zoom: 18,
            tilt: 30
          };
          this.map.moveCamera(position);
          let markerOptions: MarkerOptions = {
            position: ionic,
            title: 'Ionic',
            draggable: true
          };
          this.map.addMarker(markerOptions)
            .then(
            (marker: Marker) => {
              mapMarker = marker;
              console.log("marker");
              marker.showInfoWindow();
              marker.on(GoogleMapsEvent.MARKER_DRAG_END)
                .subscribe(() => {
                  marker.getPosition()
                    .then((position: LatLng) => {
                      this.locationCoordinates = position;
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

      else {
        console.log(data);
      }


    });

  }
  updatePage(cat) {
    if (cat === 'cafelocations') {
      this.loadMap();
    }
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SegmentPage');


  }
  ionViewDidEnter() {
    this.postRequest();
  }

  postRequest() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    console.log(localStorage.getItem("userid"));
    let postParams = {
      userid: user_id
    }

    if ("userid" in localStorage) {

      user_id = localStorage.getItem("userid");
      console.log("reached");

      this.cafeService.getAllCafeList(postParams, URL.GET_CAFELIST_URL).subscribe(data => {
        loading.dismiss();
        console.log(data);

        console.log(data.json);
        console.log(data.json.cafeList);


        if (data.json.status == "SUCCESS") {


          this.items = data.json.cafeList;

        }

      }, error => {
        loading.dismiss();
        alert("error" + error);
        console.log(error);

      });


    }

    else {

      loading.dismiss();
      console.log("else part");
      this.navCtrl.push(Login);
    }




  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: Msg,
      buttons: [btn]
    });
    alert.present();
  }

  addNewCafe(): void {
    if (mapMarker != undefined) {
      mapMarker.remove();
    }
    this.presentModal();

  }

  loadMap() {

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

  

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    //this.loadMap();

  }

  loading() {
   
    let input_from = (<HTMLInputElement>document.getElementById('journey_from'));
    let input_to = (<HTMLInputElement>document.getElementById('journey_to'));

    
    let options = {
      types: [],
      componentRestrictions: { country: "IND" }
    };

    
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    

    
    let self = this;

    
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
