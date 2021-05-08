import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ProductPaginationModel } from '../../models/product.model';
import { ShopService } from '../../services/shop.service';
import { AuthService } from 'src/app/services/auth.service';
import { ShopProductModel, ShopModel } from '../../models/shop.model';
import { brandModel } from '../../models/Brand.model';
import { CategoryModel } from '../../models/category.model';
import { CopURLComponent } from 'src/app/modules/SharedComps/cop-url/cop-url.component';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';
import { NotifyService } from 'src/app/services/notify.service';
import { ImageViewerComponent } from 'src/app/modules/SharedComps/image-viewer/image-viewer.component';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {

  sadminId:any="";
  Sbrand:any="";
  Scategory:any="";
  isLoading:Boolean=false;
  autocomplete:any="";
  AllProducts:ShopProductModel[]=[];
  Brands:brandModel[]=[];
  Categories:CategoryModel[]=[];
  pagination=new ProductPaginationModel();
  form=new FormData();
  shopInfo=new ShopModel();
  constructor(
    private shopSer:ShopService,
    private authSer:AuthService,
    private route:ActivatedRoute,
    private notify:NotifyService
  ) {
    this.route.params.subscribe(res=>{
      this.sadminId=res['sadminId'];
      this.form.append("sadminid",this.sadminId)
      this.shopSer.getShopProductsFromDB("","1",this.form)
      this.shopSer.getShopBrandsFromDB(res['sadminId']);
      this.shopSer.getShopCategoriesFromDB(res['sadminId']);
    });
   this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
   }

  ngOnInit() {
   
    
               this.shopSer.ShopProductsDBList.subscribe(res=>{
                 this.AllProducts=res;
                 
                })
                this.shopSer.shopInfo.subscribe(res=>{
                  this.shopInfo=res
                });
                this.shopSer.ShopBrandsDBList.subscribe(res=>{
                  this.Brands=res;
                 })
                 this.shopSer.ShopCategoriesDBList.subscribe(res=>{
                  this.Categories=res;
                 })
                this.shopSer.pagination.subscribe(res=>{this.pagination=res})
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.shopSer.getShopProductsFromDB(this.autocomplete,"1",this.form);
    }
  }
  refresh()
  {
    this.shopSer.getAllProductsFromDB(this.autocomplete,"1");
  }
  search()
  {
    if(this.autocomplete!="")
    {
      this.shopSer.getShopProductsFromDB(this.autocomplete,"1",this.form);
    }
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      this.shopSer.getShopProductsFromDB("",this.pagination.current_page+1,this.form);
    }
  }
  setbackPath()
  {
    this.shopSer.backPath.next("/shops")
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.shopSer.getShopProductsFromDB("",this.pagination.current_page-1,this.form);
    }

  }
  shareShop(sadmin,product)
  {
   this.notify.showModal(CopURLComponent,{Url:MyEnviroment.webUrl+'shop/'+sadmin+'/'+product+'/product-details'});
  }
  brand()
  {
   var f1=new FormData();
   f1.append("sadminid",this.sadminId)
   f1.append("brandid",this.Sbrand)
   f1.append("categoryid",this.Scategory)
   this.shopSer.getShopProductsFromDB("","1",f1)
  }
  category()
  {
    var f2=new FormData();
    f2.append("sadminid",this.sadminId)
   f2.append("brandid",this.Sbrand)
   f2.append("categoryid",this.Scategory)
   this.shopSer.getShopProductsFromDB("","1",f2)
  }
  viewImage(url)
  {
    this.notify.showModal(ImageViewerComponent,{ImageUrl:url});
  }
}
