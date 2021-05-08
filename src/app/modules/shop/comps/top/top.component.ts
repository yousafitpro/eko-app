import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { MyshopCartComponent } from '../myshop-cart/myshop-cart.component';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {

  constructor(
    private notify:NotifyService
  ) { }

  ngOnInit() {}
  showCart()
  {
this.notify.showModal(MyshopCartComponent,{});
  }
}
