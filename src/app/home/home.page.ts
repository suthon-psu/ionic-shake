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
  constructor(
    private platform : Platform,
    private deviceMotion: DeviceMotion
  ){
    platform.ready().then(() => {
      var subscription = deviceMotion.watchAcceleration({frequency:200}).subscribe(acc => {
        this.count++;
      })
    })
  }
}
