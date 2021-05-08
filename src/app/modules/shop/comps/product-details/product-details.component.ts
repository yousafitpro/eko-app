import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ShopLocationModel, ShopModel } from '../../models/shop.model';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { cartService } from '../../services/cart.service';
import { CustomFieldModel } from 'src/app/modules/myshop/models/CustomField.model';
import { CopURLComponent } from 'src/app/modules/SharedComps/cop-url/cop-url.component';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';
import { NotifyService } from 'src/app/services/notify.service';
import { ImageViewerComponent } from 'src/app/modules/SharedComps/image-viewer/image-viewer.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productID:any="";
  sadminID:any="";
 issattribute:boolean=false;
 product=new ProductModel();
 shopInfo=new ShopModel();
 attributes:CustomFieldModel[]=[];
 isLoading:Boolean=false;
 isShopPath:Boolean=false;
 location=new ShopLocationModel();
  constructor(
    private route: ActivatedRoute,
    private authSer:AuthService,
    private shopSer:ShopService,
    private cartSer:cartService,
    private notify:NotifyService
  ) {
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});

   }
   addToCart(val)
   {
     var price=this.product.rprice-((this.product.rprice/100)*this.product.discount)+((this.product.rprice/100)*this.product.tax)
     if(val!="")
     {
      this.cartSer.addProduct(this.product.id,this.product.name,this.product.sadmin,val,this.product.image,price);
     }


   }
   viewImage(url)
   {
     this.notify.showModal(ImageViewerComponent,{ImageUrl:url});
   }
  ngOnInit() {


    this.route.params.subscribe(params => {
      this.productID=params['productId'];
      this.sadminID=params['sadminId'];
      if(params['path']==1)
      {
        this.isShopPath=true;
      }
      else
      {
  
        this.isShopPath=false;
      }
   });

    this.shopSer.getProductDetailFromDB(this.productID).subscribe(res=>{
      var r:any=res;
        this.product=r.product;
        this.shopInfo=r.shopInfo;
        this.attributes=r.attributes;
        this.location=r.location;
       
        if(r.attributes.length>0)
        {

          this.issattribute=true;
        }
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  shareShop(sadmin,product)
  {
   this.notify.showModal(CopURLComponent,{Url:MyEnviroment.webUrl+'shop/'+sadmin+'/'+product+'/product-details'});
  }
  goToLocation()
  {
    this.shopSer.redirectTOLocation(this.location.latitude,this.location.longitude);
  }
}
