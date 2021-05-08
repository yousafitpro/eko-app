import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-shop-side-menu',
  templateUrl: './my-shop-side-menu.component.html',
  styleUrls: ['./my-shop-side-menu.component.scss'],
})
export class MyShopSideMenuComponent implements OnInit {

  constructor(
     private menu: MenuController,
              ) { }

  ngOnInit() {}
  hideShopMenu()
  {

      this.menu.toggle("myshopMenu");
    
  }
}
