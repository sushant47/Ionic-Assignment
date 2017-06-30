import { Injectable } from '@angular/core'

import { AlertController } from 'ionic-angular'
import { ModalController } from 'ionic-angular'
import { ToastController } from 'ionic-angular'

export class AlertData {
    constructor(public alertController: AlertController) {

    }

    alertMessages(title: string, message: string, button: string) {

        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: [button]
        });
        alert.present();

    }

}