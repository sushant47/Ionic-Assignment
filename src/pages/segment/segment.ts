import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { URL } from '../constants/constants';
import { Login } from '../login/login';
import { ModalPage } from '../modal/modalpage';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

let Title: string;
let Msg: string;
let btn: string;
let user_id: string;


@Component({
  selector: 'page-segment',
  templateUrl: 'segment.html',
  providers: [CafeService]
})
export class SegmentPage implements OnInit {

  //@ViewChild('map') mapElement: ElementRef;
  map: any;
  fromValue: string;
  toValue: string;
  public items: any;
  cat: string = "cafelist";
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public geolocation: Geolocation, public navParams: NavParams, public cafeService: CafeService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.fromValue = '';
    this.toValue = '';
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
      else {
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

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log("inside map");
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      //console.log("mapelement " + this.mapElement);
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      //this.map.setCenter(latLng);
      //this.loading();

    }, (err) => {
      console.log(err);
    });

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
