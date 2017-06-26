import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { URL } from '../constants/constants';
import { Login } from '../login/login';
import { ModalPage } from '../modal/modalpage';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { HttpService } from '../services/http.service';
import { AddCafe } from '../addcafe/addcafe';


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
  public items;
  cafeMenu: string = "cafelist";
  public mapData:LatLng [];
  public placeName:string [];
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public httpService: HttpService, public toastCtrl: ToastController, public geolocation: Geolocation, public cafeService: CafeService, public alertCtrl: AlertController) {
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
  
  updatePage(cafeMenu) {
    if (cafeMenu === 'cafelocations' && this.map != undefined) {
      this.map.remove();
      this.loadMap();
    }
    else if(this.map == undefined){
      this.loadMap();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SegmentPage');
    this.loadMap();

  }
  ionViewDidEnter() {
   
    this.postRequest();
     if(this.cafeMenu==='cafelocations'){
     this.loadMap(); 
    }
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
        console.log("getAllCafeList data " + data);
       // console.log(data.cafeList[0].location.name);

        if (data.status == "SUCCESS") {

          this.items = data.cafeList;
          this.placeName = [];
          this.mapData = [];
          for (let i = 0; i < data.cafeList.length; i++) {
            
            console.log(this.items[i].location);
            this.placeName[i] = data.cafeList[i].name;
            this.mapData[i] = new LatLng(JSON.parse(data.cafeList[i].location).lat,JSON.parse(data.cafeList[i].location).lng); 
            this.items[i].location = JSON.parse(data.cafeList[i].location);
            
            
           
          }

          //this.posts = this.user_service.Get_User();

          //this.items = data.json.cafeList;
          //this.items = data.json.cafeList;
          console.log("items " + this.items);
          //let a = JSON.stringify(this.items[43].location);
          //console.log("items " + JSON.parse(this.items[43].location).name);


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
    this.map.remove();
    //this.presentModal();
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
        for(let i=0;i<this.mapData.length;i++){
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



  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    //this.loadMap();

  }

  

}
