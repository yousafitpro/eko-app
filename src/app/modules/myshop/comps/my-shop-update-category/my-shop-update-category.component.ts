import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from 'src/app/modules/shop/models/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-shop-update-category',
  templateUrl: './my-shop-update-category.component.html',
  styleUrls: ['./my-shop-update-category.component.scss'],
})
export class MyShopUpdateCategoryComponent implements OnInit {
  isLoading:Boolean=false;
  mform=new CategoryModel();
  catId:any;
  constructor(
    private catSer:CategoryService,
    private notify:NotifyService,
    private authSer:AuthService,
    private route:ActivatedRoute
  ) { 
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
  }

  ngOnInit() {
    this.route.params.subscribe(res=>{
      this.catId=res['id'];
      this.catSer.edit(res['id']).subscribe(res=>
        {
          var v:any=res;
        this.mform= v.category[0];
        },
        error=>{
          error.error.error.forEach(element => {
        this.notify.customTost(element)
          });
        })
    })
    
  }
  update(v)
  {
  if(v=="")
  {
    this.notify.customTost("Name Field is Required");
  }
  else
  {
    this.notify.presentLoading("Please wait...","bubbles")
    var form=new FormData();
    form.append("name",v);
    form.append("id",this.catId);
    this.catSer.update(form).subscribe(res=>{
      this.catSer.getAllCategoriesFromDB("","1");
      this.notify.hideLoading();
     this.notify.Alert("Success","Category successfully Updated",1000);
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
