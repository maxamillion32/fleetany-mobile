'use strict';

import {Page} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {

  private tankfill: boolean;

  constructor() {
  	this.tankfill = true;
  }

}