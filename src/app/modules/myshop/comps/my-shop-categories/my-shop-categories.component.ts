import { Component, OnInit } from '@angular/core';
import { CategoryModel, CategoryPaginationModel } from 'src/app/modules/shop/models/category.model';
import { CategoryService } from '../../services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { MyShopWelcomeComponent } from '../my-shop-welcome/my-shop-welcome.component';
import { CategoryoptionsPopoversComponent } from '../popovers/categoryoptions-popovers/categoryoptions-popovers.component';
import { MyShopAddCategoryComponent } from '../my-shop-add-category/my-shop-add-category.component';
import { data } from 'jquery';

@Component({
  selector: 'app-my-shop-categories',
  templateUrl: './my-shop-categories.component.html',
  styleUrls: ['./my-shop-categories.component.scss'],
})
export class MyShopCategoriesComponent implements OnInit {
  isLoading:Boolean=false;
  Categories:CategoryModel[]=[];
  pagination=new CategoryPaginationModel();
  autocomplete:any="";
  popover:any;
  constructor(
    private catSer:CategoryService,
    private authSer:AuthService,
    public popoverController: PopoverController,
    public modalController: ModalController
  ) { 
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
    this.catSer.getAllCategoriesFromDB("","1");
  }

  ngOnInit() {
  
    this.catSer.AllCategoriesDBList.subscribe(res=>this.Categories=res);
    this.catSer.pagination.subscribe(res=>this.pagination=res);
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.catSer.getAllCategoriesFromDB(this.autocomplete,"1");
    }
  }
  search()
  {
    if(this.autocomplete!="")
    {
      this.catSer.getAllCategoriesFromDB(this.autocomplete,"1");
    }
  }
  refresh()
  {
    this.catSer.getAllCategoriesFromDB(this.autocomplete,"1")
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      this.catSer.getAllCategoriesFromDB("",this.pagination.current_page+1);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.catSer.getAllCategoriesFromDB("",this.pagination.current_page-1);
    }

  }
  showDeletDialog()
  {
   
  }
  async presentPopover(nid) {
    const popover = await this.popoverController.create({
      component: CategoryoptionsPopoversComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      id:nid,
    });
    this.catSer.sideoptionsPopover.next(popover)
    return await popover.present();
  }


}
