import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-shop-add-category',
  templateUrl: './my-shop-add-category.component.html',
  styleUrls: ['./my-shop-add-category.component.scss'],
})
export class MyShopAddCategoryComponent implements OnInit {

  constructor(
    private catSer:CategoryService,
    private notify:NotifyService,
  ) { }

  ngOnInit() {
  }

  
add(v)
{
if(v=="")
{
  this.notify.customTost("Name Field is Required");
}
else
{
  this.notify.presentLoading("Please wait...","bubbles");
  var form=new FormData();
  form.append("name",v);
  this.catSer.add(form).subscribe(res=>{
    this.catSer.getAllCategoriesFromDB("","1");
    this.notify.hideLoading();
   this.notify.Alert("Success","Category successfully Added",1000);
  },
  error=>{
    error.error.error.forEach(element => {
      this.notify.hideLoading();
      this.notify.Alert("Error",element,2000);
    });
  })
}
}
}
