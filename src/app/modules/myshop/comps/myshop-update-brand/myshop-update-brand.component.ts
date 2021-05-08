import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from '../../services/brand.service';
import { brandModel } from 'src/app/modules/shop/models/Brand.model';

@Component({
  selector: 'app-myshop-update-brand',
  templateUrl: './myshop-update-brand.component.html',
  styleUrls: ['./myshop-update-brand.component.scss'],
})
export class MyshopUpdateBrandComponent implements OnInit {
  mform=new brandModel();
  brandId:any;
  constructor(
    private brandSer:BrandService,
    private notify:NotifyService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe(res=>{
      this.brandId=res['id'];
      
      this.brandSer.edit(res['id']).subscribe(res=>
        {
          
          var v:any=res;
        this.mform= v.brand[0];
        },
        error=>{
          error.error.error.forEach(element => {
        this.notify.customTost(element)
          });
        })
    })
    
  }
  update(name,short,long)
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
    fd.append('id',this.brandId);
    fd.append('name',name);
    fd.append('shortdescription',short);
    fd.append('longdescription',long);
    this.brandSer.update(fd).subscribe(res=>{
      this.brandSer.getAllBrandsFromDB("","1");
      this.notify.hideLoading();
     this.notify.Alert("Success","Brand successfully Updated",1000);
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
