import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-location-viewer',
  templateUrl: './location-viewer.component.html',
  styleUrls: ['./location-viewer.component.scss'],
})
export class LocationViewerComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  height = 0;
  
  constructor(public platform: Platform) {
    console.log(platform.height());
    this.height = platform.height() - 56;
  }
  ngOnInit() {}

}
