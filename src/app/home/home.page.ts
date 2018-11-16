import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  count = 0;
  subscription: any

  constructor(
    private platform : Platform,
    private deviceMotion: DeviceMotion
  ){
    /*platform.ready().then(() => {
      
    })*/
  }

  handleShake(){
    this.count++;
  }

  ionViewWillEnter(){
    this.subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe(acc => {
      this.detectShake(acc)
    })
  }

  ionViewWillLeave() {    
    this.subscription.unsubscribe();
  }

  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;
  detectShake(acc){
    if(!this.lastX) {
      this.lastX = acc.x;
      this.lastY = acc.y;
      this.lastZ = acc.z;
      return;
    }

    let deltaX:number, deltaY:number, deltaZ:number;
    deltaX = Math.abs(acc.x-this.lastX);
    deltaY = Math.abs(acc.y-this.lastY);
    deltaZ = Math.abs(acc.z-this.lastZ);

    if(deltaX + deltaY + deltaZ > 3) {
      this.moveCounter++;
    } else {
      this.moveCounter = Math.max(0, --this.moveCounter);
    }

    if(this.moveCounter > 2) { 
      console.log('SHAKE');
      this.handleShake()
      this.moveCounter=0; 
    }

    this.lastX = acc.x;
    this.lastY = acc.y;
    this.lastZ = acc.z;
  }
}
