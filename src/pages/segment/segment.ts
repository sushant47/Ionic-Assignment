import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { URL, STATUS_MSG, SEGMENT_ALERT_CONSTANTS } from '../constants/constants';
import { Login } from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { HttpService } from '../services/http.service';
import { AddCafe } from '../addcafe/addcafe';
import { AlertControllerData } from "../userinputdata/alertcontrollerdata";

let user_id: string;

@Component({
  selector: 'page-segment',
  templateUrl: 'segment.html',
  providers: [CafeService, HttpService]
})
export class SegmentPage {

  myLong: number;
  myLat: number;
  locationCoordinates: any;
  map: any;
  public items;
  cafeMenu: string = "cafelist";
  public mapData: LatLng[];
  public placeName: string[];
  alertControllerData: AlertControllerData = {};

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public httpService: HttpService, public toastCtrl: ToastController, public geolocation: Geolocation, public cafeService: CafeService, public alertCtrl: AlertController) {


  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertControllerData.title,
      subTitle: this.alertControllerData.msg,
      buttons: [this.alertControllerData.btn]
    });
    alert.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Extentia Cafe Outlet Added Successfully',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  updatePage(cafeMenu) {
    if (cafeMenu === 'cafelocations' && this.map != undefined) {
      this.map.remove();
      this.loadMap();
    }
    else if (this.map == undefined) {
      this.loadMap();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SegmentPage');
    this.loadMap();

  }
  ionViewDidEnter() {

    this.postRequest();
    if (this.cafeMenu === 'cafelocations') {
      this.loadMap();
    }
  }



  postRequest() {

    let loading = this.loadingCtrl.create({
      content: SEGMENT_ALERT_CONSTANTS.SEGMENT_LOADING_MESSAGE
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
        console.log("getAllCafeList data " + data);

        if (data.status == STATUS_MSG.STATUS_MSG_SUCCESS) {

          this.items = data.cafeList;
          this.placeName = [];
          this.mapData = [];
          for (let i = 0; i < data.cafeList.length; i++) {

            console.log(this.items[i].location);
            this.placeName[i] = data.cafeList[i].name;
            this.mapData[i] = new LatLng(JSON.parse(data.cafeList[i].location).lat, JSON.parse(data.cafeList[i].location).lng);
            this.items[i].location = JSON.parse(data.cafeList[i].location);

          }

          console.log("items " + this.items);

        }

      }, error => {
        loading.dismiss();
        this.alertControllerData.title = SEGMENT_ALERT_CONSTANTS.SEGMENT_LOADING_ERROR_TITLE;
        this.alertControllerData.msg = SEGMENT_ALERT_CONSTANTS.SEGMENT_LOADING_ERROR_TITLE_MSG;
        this.alertControllerData.btn = SEGMENT_ALERT_CONSTANTS.SEGMENT_LOADING_ERROR_TITLE_BTN;
        this.showAlert();
        console.log(error);

      });


    }

    else {

      loading.dismiss();
      console.log("else part");
      this.navCtrl.push(Login);
    }

  }


  addNewCafe(): void {

    this.map.remove();
    this.navCtrl.push(AddCafe);

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
        for (let i = 0; i < this.mapData.length; i++) {
          let markerOptions: MarkerOptions = {
            position: this.mapData[i],
            title: this.placeName[i]
          };

          const marker: Marker = this.map.addMarker(markerOptions)
            .then((marker: Marker) => {
              console.log(marker);
              marker.showInfoWindow();
            });
        }

        console.log('Map is ready!');
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
