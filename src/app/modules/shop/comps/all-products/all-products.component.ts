import { ProductModel, ProductPaginationModel } from './../../models/product.model';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CopURLComponent } from 'src/app/modules/SharedComps/cop-url/cop-url.component';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';
import { NotifyService } from 'src/app/services/notify.service';
import { ImageViewerComponent } from 'src/app/modules/SharedComps/image-viewer/image-viewer.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  isLoading:Boolean=false;
  autocomplete:any="";
  AllProducts:ProductModel[]=[];
  pagination=new ProductPaginationModel();
  cpage:any=null;
  npage:any=null;
  constructor(
    private shopSer:ShopService,
    private authSer:AuthService,
    private notify:NotifyService

  ) {
 this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
   }

  ngOnInit() {
               this.shopSer.getAllProductsFromDB(this.autocomplete,"1");
               this.shopSer.AllProductsDBList.subscribe(res=>{
                 this.AllProducts=res;
                 
                })
                this.shopSer.pagination.subscribe(res=>{
                  this.pagination=res;
                
                })
  }
  shareShop(sadmin,product)
  {
   this.notify.showModal(CopURLComponent,{Url:MyEnviroment.webUrl+'shop/'+sadmin+'/'+product+'/product-details'});
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.shopSer.getAllProductsFromDB(this.autocomplete,"1");
    }
  }
  search()
  {
    if(this.autocomplete!="")
    {
      this.shopSer.getAllProductsFromDB(this.autocomplete,"1");
    }
  }
  refresh()
  {
    this.shopSer.getAllProductsFromDB(this.autocomplete,"1");
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      this.shopSer.getAllProductsFromDB("",this.pagination.current_page+1);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.shopSer.getAllProductsFromDB("",this.pagination.current_page-1);
    }

  }
  viewImage(url)
  {
    this.notify.showModal(ImageViewerComponent,{ImageUrl:url});
  }
}
