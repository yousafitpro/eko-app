import { Component, OnInit } from '@angular/core';
import { cartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-myshop-cart',
  templateUrl: './myshop-cart.component.html',
  styleUrls: ['./myshop-cart.component.scss'],
})
export class MyshopCartComponent implements OnInit {
  List:CartModel[]=[];
  isLoading:Boolean=false;
  TItems:any=0;
  TTotalBil:any=0;
  constructor(
    private cartSer:cartService,
    private authSer:AuthService,
    private notify:NotifyService
  ) { }

  ngOnInit() {
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
    this.cartSer.cartList.subscribe(res=>{
      this.List=res;
    });
    this.calculate();
  }
  calculate()
  {
    this.TItems=0;
    this.TTotalBil=0;
    this.List.forEach(l=>{
      this.TItems++;
       this.TTotalBil+=l.total;
    })
  }
  removeProduct(id)
  {
    this.cartSer.removeProduct(id);
    this.calculate();
  }
  close(){
    this.notify.hideModal();
  }
}
