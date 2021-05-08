import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-shop-top',
  templateUrl: './my-shop-top.component.html',
  styleUrls: ['./my-shop-top.component.scss'],
})
export class MyShopTopComponent implements OnInit {

 
  constructor(
    private menu: MenuController,
             ) { }

 ngOnInit() {}


}
