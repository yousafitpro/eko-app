import { Component, OnInit } from '@angular/core';
import { OrderModel, orderPaginationModel } from 'src/app/modules/myshop/models/order.model';
import { ShopService } from '../../services/shop.service';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular';
import { ShopOrderPopoverComponent } from '../popovers/shop-order-popover/shop-order-popover.component';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.scss'],
})
export class ShopOrdersComponent implements OnInit {
  isLoading:Boolean=false;
  Orders:OrderModel[]=[];
  pagination=new orderPaginationModel();
  autocomplete:any="";
  popover:any;
  constructor(
    private shopSer:ShopService,
    private authSer:AuthService,
    public popoverController: PopoverController
  ) { 
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
    this.shopSer.getOrdersFromDB("","1");
  }

  ngOnInit() {
  
    this.shopSer.ShopOrdersDBList.subscribe(res=>this.Orders=res);
    this.shopSer.pagination.subscribe(res=>this.pagination=res);
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.shopSer.getOrdersFromDB(this.autocomplete,"1");
    }
  }
  search()
  {
    if(this.autocomplete!="")
    {
      this.shopSer.getOrdersFromDB(this.autocomplete,"1");
    }
  }
  refresh()
  {
    this.shopSer.getOrdersFromDB(this.autocomplete,"1")
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      this.shopSer.getOrdersFromDB("",this.pagination.current_page+1);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.shopSer.getOrdersFromDB("",this.pagination.current_page-1);
    }

  }
  showDeletDialog()
  {
   
  }
  async presentPopover(nid) {
    const popover = await this.popoverController.create({
      component: ShopOrderPopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      id:nid,
    });
    this.shopSer.sideoptionsPopover.next(popover)
    return await popover.present();
  }



}
