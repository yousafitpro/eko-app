import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationViewerComponent } from 'src/app/modules/SharedComps/location-viewer/location-viewer.component';
import { ShopLocationModel, ShopModel } from 'src/app/modules/shop/models/shop.model';
import { ShopService } from 'src/app/modules/shop/services/shop.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-shop-info',
  templateUrl: './my-shop-info.component.html',
  styleUrls: ['./my-shop-info.component.scss'],
})
export class MyShopInfoComponent implements OnInit {

  email:string="";
  code:string="";
  codeSent:boolean=false;
  codeVerified:boolean=false;
  attempts=0;
  shop=new ShopModel();
  location=new ShopLocationModel()
  constructor(
    private notify:NotifyService,
    private router:Router,
    private authSer:AuthService,
    private shopSer:ShopService,
    
  ) { }

  ngOnInit() {
    this.setDefaults();
    
  }
  Retry(){
    this.codeSent=false;
    this.codeVerified=false;
  }
setDefaults()
{
  this.notify.presentLoading("Please wait...","bubbles");
  this.shopSer.getShopDetails().subscribe(res=>{
    this.notify.hideLoading();
    var r:any=res;
     this.shop=r.shopinfo;
     this.location=r.location;
  },error=>{this.notify.hideLoading();})
}
getLocation()
{

  this.shopSer.getCurrentLocation();
  this.setDefaults();
}
viewLocation()
{
 this.shopSer.redirectTOLocation(this.location.latitude,this.location.longitude); 
}
  saveChanges(name,address,phone,mobile)
  {
    if(name=="")
    {
      this.notify.customTost("Shop Name is required")
    }
    else if(address=="")
    {
      this.notify.customTost("Shop Address is required")
    }
    else if(phone=="")
    {
      this.notify.customTost("Shop Phone Number is required")
    }
    else if(mobile=="")
    {
      this.notify.customTost("Owner Mobile Number is required")
    }
    else
    {
      this.notify.presentLoading("Please wait...","bubbles");
      var form=new FormData();
      form.append("companyname",name)
      form.append("companyaddress",address)
      form.append("companyphone",phone)
      form.append("mobile",mobile)
      var message;
      this.shopSer.updateShopInfo(form).subscribe(
        res=>{
          this.notify.hideLoading();
             message=res;
             this.notify.Alert("Success",message.message,2000);
            },
      error=>{
        this.notify.hideLoading();
        error.error.error.forEach(element =>this.notify.Alert("Error",element,2000));
      });
    }

  }

}
