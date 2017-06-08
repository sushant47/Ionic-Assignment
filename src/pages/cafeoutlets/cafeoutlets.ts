import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UrlRequestService } from '../services/url-request.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { ModalController, NavParams } from 'ionic-angular';
import { ModalPage } from '../modal/modalpage';

let Title: string;
let Msg: string;
let btn: string;
let user_id: string;


@Component({
    selector: 'page-cafeoutlets',
    templateUrl: 'cafeoutlets.html',
    providers: [UrlRequestService]
})

export class CafeOutlets {

    public items: any;
 
    constructor(public navCtrl: NavController, public http: Http, private urlRequestService: UrlRequestService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.postRequest();
    }


    presentModal() {
        let modal = this.modalCtrl.create(ModalPage);
        modal.present();

        modal.onDidDismiss(data => {
            console.log(data);
        });

    }

    postRequest() {

        console.log(localStorage.getItem("userid"));
        let postParams = {
            userid: user_id
        }

        if ("userid" in localStorage) {

            user_id = localStorage.getItem("userid");
            console.log("reached");
            let url: string = 'https://extcafe.herokuapp.com/api/getCafeList';

            this.urlRequestService.postRequest(postParams, url).subscribe(data => {

                console.log(data['_body']);
                var stat = data['_body'];
                stat = JSON.parse(data['_body']);;
                console.log(stat.status);
                console.log(stat.cafeList[0]);
                console.log(stat.cafeList);

                if (stat.status == "SUCCESS") {


                    this.items = stat.cafeList;

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


}