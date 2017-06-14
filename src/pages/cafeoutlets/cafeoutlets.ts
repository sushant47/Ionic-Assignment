import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CafeService } from '../services/cafe.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { ModalController, NavParams } from 'ionic-angular';
import { ModalPage } from '../modal/modalpage';
import { ToastController } from 'ionic-angular';
import {URL} from '../constants/constants';

let Title: string;
let Msg: string;
let btn: string;
let user_id: string;


@Component({
    selector: 'page-cafeoutlets',
    templateUrl: 'cafeoutlets.html',
    providers: [CafeService]
})

export class CafeOutlets implements OnInit {
    

    public items: any = [];

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http, private cafeService: CafeService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
        
    }


    ionSelected() {
        // alert("Home Page has been selected");

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
                that.getAllCafeList();
            }
            else {
                console.log(data);
            }


        });

    }

    getAllCafeList() {

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

ngOnInit(): void {
       this.getAllCafeList();
    }

}