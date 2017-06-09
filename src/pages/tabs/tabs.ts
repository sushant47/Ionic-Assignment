import { Component } from '@angular/core';

import { CafeOutlets } from '../cafeoutlets/cafeoutlets';
import { CafeLocation } from '../cafelocation/cafelocation';


@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = CafeOutlets;
    tab2Root = CafeLocation;
    constructor() {

    }


}
