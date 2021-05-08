import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ProductPaginationModel } from '../../models/product.model';
import { SoldProductModel } from '../../models/soldProduct.Model';

@Component({
  selector: 'app-shop-order-products',
  templateUrl: './shop-order-products.component.html',
  styleUrls: ['./shop-order-products.component.scss'],
})
export class ShopOrderProductsComponent implements OnInit {
  orderId:any;
  isLoading:Boolean=false;
  products:SoldProductModel[]=[];
  pagination=new ProductPaginationModel();
  autocomplete:any="";
  popover:any;
  cateId="";
  brandId="";
  status="";
  constructor(
    private shopser:ShopService,
    private authSer:AuthService,
    private route:ActivatedRoute
  ) { 

    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
    this.route.params.subscribe(res=>{
      this.orderId=res['orderId']
      this.shopser.getOrderProductsFromDB("","1",this.orderId);
    })
  }

  ngOnInit() {
    
    this.shopser.ShopOrderProductDBList.subscribe(res=>this.products=res);
    this.shopser.orderproductsPagination.subscribe(res=>this.pagination=res);
  }
  getAll()
  {
    this.shopser.getOrderProductsFromDB(this.autocomplete,"1",this.orderId); 
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.shopser.getOrderProductsFromDB(this.autocomplete,"1",this.orderId);
    }
  }
  search()
  {
    if(this.autocomplete!="")
    {

      this.shopser.getOrderProductsFromDB(this.autocomplete,"1",this.orderId);
    }
  }
  refresh()
  {

    this.shopser.getOrderProductsFromDB(this.autocomplete,"1",this.orderId)
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {

      this.shopser.getOrderProductsFromDB("",this.pagination.current_page+1,this.orderId);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.shopser.getOrderProductsFromDB("",this.pagination.current_page-1,this.orderId);
    }
  }
}
