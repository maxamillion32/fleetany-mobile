'use strict';

import {Page, Alert, NavController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {Toast} from 'ionic-native';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';

@Page({
  templateUrl: 'build/pages/fuel/fuel.html',
  directives: [FORM_DIRECTIVES]
})
export class Fuel {

  public fuelForm: ControlGroup;
  public userData: UserData;
  private price: AbstractControl;
  private amount: AbstractControl;
  private type: AbstractControl;
  private miliage: AbstractControl;
  private tankfill: AbstractControl;
  private fuelsent: boolean;
  private vehiclefailed: boolean;
  private types: Array<any>;

  constructor(fb: FormBuilder, userData: UserData, public nav: NavController) {
    this.userData = userData;
  	this.fuelsent = false;
  	this.vehiclefailed = false;
    this.types = []

    this.fuelForm = fb.group({  
        'price':    ['', Validators.required ],
        'amount':   ['', Validators.required ],
        'miliage':  ['', Validators.required ],
        'type':     ['', ],
        'tankfill': ['', ]
    });

    for(let field in this.fuelForm.controls) {
        this[field] = this.fuelForm.controls[field];
    };

    this.userData.getFuelTypes().then((types) => {
      this.types = types;
    });
    
    this.fuelForm.controls['type'].updateValue('regular');
    this.fuelForm.controls['tankfill'].updateValue(true);
  }

  onSubmit(value: any): void { 
      if(this.fuelForm.valid) {
          console.log('Submitted value: ', value);

          let params: any = {};
          params.fuel_cost = value.price;
          params.fuel_amount = value.amount;
          params.end_mileage = value.miliage;
          params.fuel_type = value.type;
          params.tank_fill_up = value.tankfill ? 1 : 0;			
           
          if (this.userData.plate == null) {
            this.userData.showToast('Vehicle should be selected!', 'Error!', this.nav);			    
          } else {
            this.userData.postApi('trip', params).subscribe(
              res => {

                for(let field in this.fuelForm.controls) {
                  this.fuelForm.controls[field].updateValue('');
                };

                this.fuelForm.controls['type'].updateValue('regular');
                this.fuelForm.controls['tankfill'].updateValue(true);

                this.userData.showToast('Fuel sent successfully!', 'Success!', this.nav);
            
              },
              error => {
                this.userData.showToast('Error sending data: ' + error.statusText, 'Error!', this.nav);
                console.log(error);
              }
            );
          }
      }
  } 

}
