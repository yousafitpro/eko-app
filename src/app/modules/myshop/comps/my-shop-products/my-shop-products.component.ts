import { Component, OnInit } from '@angular/core';
import { ProductModel, ProductPaginationModel } from 'src/app/modules/shop/models/product.model';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { ProductoptionPopoverComponent } from '../popovers/productoption-popover/productoption-popover.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageViewerComponent } from 'src/app/modules/SharedComps/image-viewer/image-viewer.component';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-my-shop-products',
  templateUrl: './my-shop-products.component.html',
  styleUrls: ['./my-shop-products.component.scss'],
})
export class MyShopProductsComponent implements OnInit {
  isLoading:Boolean=false;
  products:ProductModel[]=[];
  pagination=new ProductPaginationModel();
  autocomplete:any="";
  popover:any;
  cateId="";
  brandId="";
  status="";
  constructor(
    private productSer:ProductService,
    private authSer:AuthService,
    public popoverController: PopoverController,
    public modalController: ModalController,
    private route:ActivatedRoute,
    private router:Router,
    private notify:NotifyService
  ) { 

    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
    this.route.params.subscribe(res=>{
      
      if(res['brandId']=="0")
      {
        this.brandId="";
      }
      else
      {
        this.brandId=res['brandId'];
      }
      if(res['cateId']=="0")
      {
        this.cateId="";
      }
      else
      {
        this.cateId=res['cateId'];
      }
      var form=new FormData();
      form.append("categoryid",this.cateId);
      form.append("brandid",this.brandId);
      form.append("status",this.status);
      this.productSer.getAllProductsFromDB("","1",form);
    })
  }

  ngOnInit() {
    
    this.productSer.AllProductsDBList.subscribe(res=>this.products=res);
    this.productSer.Pagination.subscribe(res=>this.pagination=res);
  }
  getAll()
  {
    var form=new FormData();
    form.append("categoryid",this.cateId);
    form.append("brandid",this.brandId);
    form.append("status",this.status);
    this.productSer.getAllProductsFromDB(this.autocomplete,"1",form); 
  }
  keupsearch()
  {
    if(this.autocomplete=="")
    {
      var form=new FormData();
      form.append("categoryid",this.cateId);
      form.append("brandid",this.brandId);
      form.append("status",this.status);
      this.productSer.getAllProductsFromDB(this.autocomplete,"1",form);
    }
  }
  activeProducts(){
    var form=new FormData();
    form.append("categoryid",this.cateId);
    form.append("brandid",this.brandId);
    form.append("status","1");
    this.productSer.getAllProductsFromDB(this.autocomplete,"1",form);
  }
  inactiveProducts(){
    var form=new FormData();
    form.append("categoryid",this.cateId);
    form.append("brandid",this.brandId);
    form.append("status","0");
    this.productSer.getAllProductsFromDB(this.autocomplete,"1",form);
  }
  search()
  {
    if(this.autocomplete!="")
    {
      var form=new FormData();
      form.append("categoryid",this.cateId);
      form.append("brandid",this.brandId);
      form.append("status",this.status);
      this.productSer.getAllProductsFromDB(this.autocomplete,"1",form);
    }
  }
  refresh()
  {
    var form=new FormData();
    form.append("categoryid",this.cateId);
    form.append("brandid",this.brandId);
    form.append("status",this.status);
    this.productSer.getAllProductsFromDB(this.autocomplete,"1",form)
  }
  nextPage()
  {
    if(this.pagination.current_page!=this.pagination.last_page)
    {
      var form=new FormData();
      form.append("categoryid",this.cateId);
      form.append("brandid",this.brandId);
      form.append("status",this.status);
      this.productSer.getAllProductsFromDB("",this.pagination.current_page+1,form);
    }
  }
  PreviousPage()
  {
    if(this.pagination.current_page>=2)
    {
      var form=new FormData();
      form.append("categoryid",this.cateId);
      form.append("brandid",this.brandId);
      form.append("status",this.status);
      this.productSer.getAllProductsFromDB("",this.pagination.current_page-1,form);
    }

  }

  async presentPopover(nid) {
    const popover = await this.popoverController.create({
      component: ProductoptionPopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      id:nid,
    });
    this.productSer.sideoptionsPopover.next(popover)
    return await popover.present();
  }
  viewImage(url)
  {
    this.notify.showModal(ImageViewerComponent,{ImageUrl:url});
  }
}
