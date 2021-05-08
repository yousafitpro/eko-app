import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-my-shop-add-brand',
  templateUrl: './my-shop-add-brand.component.html',
  styleUrls: ['./my-shop-add-brand.component.scss'],
})
export class MyShopAddBrandComponent implements OnInit {

  constructor(
    private brandSer:BrandService,
    private notify:NotifyService,
  ) { }

  ngOnInit() {

  }
add(name,short,long)
{
if(name=="")
{
  this.notify.customTost("Name Field is Required");
}
else if(short=="")
{
  this.notify.customTost("Short Description Field is Required");
}
else if(long=="")
{
  this.notify.customTost("Long Description Field is Required");
}
else
{
  this.notify.presentLoading("Please wait...","bubbles");
  var fd=new FormData();
  fd.append('name',name);
  fd.append('shortdescription',short);
  fd.append('longdescription',long);
  this.brandSer.add(fd).subscribe(res=>{
    this.brandSer.getAllBrandsFromDB("","1");
    this.notify.hideLoading();
   this.notify.Alert("Success","Brand successfully Added",1000);
  },
  error=>{
    this.notify.hideLoading();
    error.error.error.forEach(element => {
      this.notify.Alert("Error",element,2000);
    });
  })
}
}

}
