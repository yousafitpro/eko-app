import { Component, OnInit } from '@angular/core';
import { brandModel, BrandPaginationModel } from 'src/app/modules/shop/models/Brand.model';
import { BrandService } from '../../services/brand.service';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { BrandoptionPopoverComponent } from '../popovers/brandoption-popover/brandoption-popover.component';

@Component({
  selector: 'app-my-shop-brands',
  templateUrl: './my-shop-brands.component.html',
  styleUrls: ['./my-shop-brands.component.scss'],
})
export class MyShopBrandsComponent implements OnInit {

  isLoading:Boolean=false;
  brands:brandModel[]=[];
  pagination=new BrandPaginationModel();
  autocomplete:any="";
  popover:any;
  constructor(
    private brandSer:BrandService,
    private authSer:AuthService,
    public popoverController: PopoverController,
    public modalController: ModalController
  ) { 
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
  }

  ngOnInit() {
    this.brandSer.getAllBrandsFromDB("","1");
    this.brandSer.AllBrandsDBList.subscribe(res=>this.brands=res);
    this.brandSer.pagination.subscribe(res=>this.pagination=res);
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      this.brandSer.getAllBrandsFromDB(this.autocomplete,"1");
    }
  }
  search()
  {
    if(this.autocomplete!="")
    {
      this.brandSer.getAllBrandsFromDB(this.autocomplete,"1");
    }
  }
  refresh()
  {
    this.brandSer.getAllBrandsFromDB(this.autocomplete,"1")
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      this.brandSer.getAllBrandsFromDB("",this.pagination.current_page+1);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      this.brandSer.getAllBrandsFromDB("",this.pagination.current_page-1);
    }

  }

  async presentPopover(nid) {
    const popover = await this.popoverController.create({
      component: BrandoptionPopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      id:nid,
    });
    this.brandSer.sideoptionsPopover.next(popover)
    return await popover.present();
  }


}
