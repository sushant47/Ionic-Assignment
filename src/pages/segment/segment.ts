import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
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


@Component({
  selector: 'page-segment',
  templateUrl: 'segment.html',
  providers: [CafeService,HttpService]
})
export class SegmentPage implements OnInit {
  defaultZoom: any;
  onLocationSelected: any;
  myLong: number;
  myLat: number;
  address;

  //@ViewChild('map') mapElement: ElementRef;
  map: any;
  fromValue: string;
  toValue: string;
  public items: any;
  cat: string = "cafelist";
  constructor(public navCtrl: NavController, public httpService: HttpService, public toastCtrl: ToastController, public geolocation: Geolocation, public navParams: NavParams, public cafeService: CafeService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
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
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      if (data == "success") {
        that.presentToast();
        that.postRequest();
      }
      else if(data != undefined) 
      {
        // this.address.place = data;
      let url="https://maps.googleapis.com/maps/api/geocode/json?address="+data+"&key=AIzaSyARBYHwwK5uPoNuS2iN3UOg8fQGRgHLz78";
   
    console.log(this.address.place);
    this.httpService.post("", url).subscribe(data => {

      console.log(data);
      console.log(data.json);
      let ionic: LatLng = new LatLng(data.json.results[0].geometry.location.lat,data.json.results[0].geometry.location.lng);
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
          console.log("marker");
          marker.showInfoWindow();
        }
      );
      
    }, error => {
      alert("error" + error);
      console.log(error);

    });
      }

      else{
        console.log(data);
      }


    });

  }
  updatePage(cat) {
  if (cat === 'cafelocations') {
    //alert("changed");
    this.loadMap();
  }
}

private setUpDraggableMarker(marker: Marker) {
    marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(() => {

      marker.getPosition().then((pos: LatLng) => {
        console.log(pos);
        this.onLocationSelected.emit(pos); /* changes as expected */
        this.map.animateCamera({target: pos, zoom: this.defaultZoom, duration: 8});
      });

    })
  }
  ionViewDidLoad() {
     //this.loadMap();
    console.log('ionViewDidLoad SegmentPage');
    
    
  }
  ionViewDidEnter(){
  // the html of the page is now available
  this.postRequest();
}

  postRequest() {

    console.log(localStorage.getItem("userid"));
    let postParams = {
      userid: user_id
    }

    if ("userid" in localStorage) {

      user_id = localStorage.getItem("userid");
      console.log("reached");

      this.cafeService.getAllCafeList(postParams, URL.GET_CAFELIST_URL).subscribe(data => {

        console.log(data);

        console.log(data.json);
        console.log(data.json.cafeList);


        if (data.json.status == "SUCCESS") {


          this.items = data.json.cafeList;

        }

      }, error => {
        alert("error" + error);
        console.log(error);

      });


    }

    else {

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

    this.presentModal();

  }

  loadMap() {

this.geolocation.getCurrentPosition().then((resp) => {

//this.loading();
   this.myLat = resp.coords.latitude;
   this.myLong = resp.coords.longitude;
   let location = new LatLng(this.myLat,this.myLong);
 
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



    // this.geolocation.getCurrentPosition().then((position) => {

    //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   console.log("inside map");
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }

    //   //console.log("mapelement " + this.mapElement);
    //   this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //   //this.map.setCenter(latLng);
    //   //this.loading();

    // }, (err) => {
    //   console.log(err);
    // });

  }

  // addMarker() {

  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter()
  //   });

  //   let content = "<h4>Information!</h4>";

  //   this.addInfoWindow(marker, content);

  // }

  // addInfoWindow(marker, content) {

  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });

  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });

  // }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
//this.loadMap();

  }

loading(){
   //get the two fields
    let input_from = (<HTMLInputElement>document.getElementById('journey_from'));
    let input_to = (<HTMLInputElement>document.getElementById('journey_to'));

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
