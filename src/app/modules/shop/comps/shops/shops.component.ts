import { Component, OnInit } from '@angular/core';
import { ShopModel, ShopPaginationModel } from '../../models/shop.model';
import { ProductPaginationModel } from '../../models/product.model';
import { ShopService } from '../../services/shop.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CopURLComponent } from 'src/app/modules/SharedComps/cop-url/cop-url.component';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {

  isLoading:Boolean=false;
  autocomplete:any="";
  Shops:ShopModel[]=[];
  pagination=new ShopPaginationModel();
  constructor(
    private shopSer:ShopService,
    private authSer:AuthService,
    private notify:NotifyService

  ) {
 this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
   }

  ngOnInit() {
               this.shopSer.ShopsDBList.subscribe(res=>{
                 this.Shops=res;
                })
                this.shopSer.ShopsPagination.subscribe(res=>{this.pagination=res})
  }
  refresh()
  {
    this.shopSer.getShopsFromDB(this.autocomplete,"1");
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.shopSer.getShopsFromDB(this.autocomplete,"1");
    }
  }
  search()
  {
    if(this.autocomplete!="")
    {
   this.shopSer.getShopsFromDB(this.autocomplete,"1");
    }
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      this.shopSer.getShopsFromDB("",this.pagination.current_page+1);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.shopSer.getShopsFromDB("",this.pagination.current_page-1);
    }

  }
  goTo(lat,long)
  {
    this.shopSer.redirectTOLocation(lat,long);
  }
  shareShop(id)
  {
   this.notify.showModal(CopURLComponent,{Url:MyEnviroment.webUrl+'shop/'+id+'/products'});
  }
}
