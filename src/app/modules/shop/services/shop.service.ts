import { ErrorComponent } from './../../SharedComps/error/error.component';
import { ProductModel } from './../models/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopPaginationModel, ShopsPaginationModel, ShopProductModel, ShopModel, ShopLocationModel } from '../models/shop.model';
import { HttpClient } from '@angular/common/http';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CategoryModel } from '../models/category.model';
import { brandModel } from '../models/Brand.model';
import { OrderModel } from '../../myshop/models/order.model';
import { SoldProductModel } from '../models/soldProduct.Model';
import { NotifyService } from 'src/app/services/notify.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  ShopLocation=new ShopLocationModel();
  lng:any;
  lat:any;
  sideoptionsPopover=new BehaviorSubject<any>(null);
  pagination=new BehaviorSubject<ShopPaginationModel>(null);
  // shopInfo=new BehaviorSubject<ShopModel>(null);
  ShopsPagination=new BehaviorSubject<ShopsPaginationModel>(null);
  ordersPagination=new BehaviorSubject<ShopsPaginationModel>(null);
  orderproductsPagination=new BehaviorSubject<ShopsPaginationModel>(null);
  ShopProductsDBList=new BehaviorSubject<ShopProductModel[]>([]);
  AllProductsDBList=new BehaviorSubject<ProductModel[]>([]);
  ShopCategoriesDBList=new BehaviorSubject<CategoryModel[]>([]);
  ShopBrandsDBList=new BehaviorSubject<brandModel[]>([]);
  ShopsDBList=new BehaviorSubject<ShopModel[]>([]);
  ShopOrdersDBList=new BehaviorSubject<OrderModel[]>([]);
  ShopOrderProductDBList=new BehaviorSubject<SoldProductModel[]>([]);
  backPath=new BehaviorSubject<any>("#");
  shopInfo=new BehaviorSubject<ShopModel>(null);
  constructor(
    private http:HttpClient,
    public toastController: ToastController,
    public modalController: ModalController,
    private notify:NotifyService,
    private geolocation: Geolocation
    ) {

      this.getAllProductsFromDB("","1");
      this.getShopsFromDB("","1");
   }
   private baseUrl=MyEnviroment.baseUrl+"admin/product/shop/";


   async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  getShopProductsFromDB(keys,page,form)
  {
   this.http.post(this.baseUrl+'products?keywords='+keys+"&page="+page,form).subscribe(res=>{
       var r:any=res;
        this.ShopProductsDBList.next(r.products.data);
        this.shopInfo.next(r.shopInfo);
        this.pagination.next(r.products);
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  getOrdersFromDB(keys,page)
  {
   this.http.post(this.baseUrl+'customerOrders??keywords='+keys+"&page="+page,null).subscribe(res=>{
       var r:any=res;
        this.ShopOrdersDBList.next(r.orders.data);
        this.ordersPagination.next(r.orders);
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  getOrderProductsFromDB(keys,page,id)
  {
   this.http.post(this.baseUrl+'customerOrderProducts?keywords='+keys+"&page="+page+'&orderid='+id,null).subscribe(res=>{
       var r:any=res;
        this.ShopOrderProductDBList.next(r.orderproducts.data);
        this.orderproductsPagination.next(r.orderproducts);
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  getShopBrandsFromDB(id)
  {
   this.http.post(this.baseUrl+'brands?sadminid='+id,null).subscribe(res=>{
      var r:any=res;
        this.ShopBrandsDBList.next(r.brands);
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  getAllProductsFromDB(keys,page)
  {
    // this.AllProductsDBList.next([]);
   this.http.post(this.baseUrl+'AllProducts?keywords='+keys+"&page="+page,null).subscribe(res=>{
      var r:any=res;
        this.AllProductsDBList.next(r.products.data);
        this.pagination.next(r.products);
       },error=>{
        this.presentToast("Data Cannot Be Fetched");
        // this.notify.showModal(ErrorComponent,{error:error.message,statusText:error.statusText})
    //  error.error.error.forEach(element => {
          
    //  });
   });
  }
  getShopCategoriesFromDB(id)
  {
   this.http.post(this.baseUrl+'categories?sadminid='+id,null).subscribe(res=>{
      var r:any=res;
        this.ShopCategoriesDBList.next(r.categories);
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  getShopsFromDB(keys,page)
  {
   this.http.post(this.baseUrl+'shops?keywords='+keys+"&page="+page,null).subscribe(res=>{
      var r:any=res;
        this.ShopsDBList.next(r.shops.data);
        this.ShopsPagination.next(r.shops);
       },error=>{
     error.error.error.forEach(element => {
              // this.notify.ToastrError("Error",element);
     });
   });
  }
  getProductDetailFromDB(id)
  {
   return this.http.post(this.baseUrl+'productDetails?id='+id,null);
  }
  updateShopInfo(form)
  {
    return this.http.post(this.baseUrl+'updateShopInfo',form);
  }

  getShopDetails()
  {
   return this.http.post(this.baseUrl+'shopDetails',null);
  }
getCurrentLocation()
{
  this.geolocation.getCurrentPosition(
    {maximumAge: 1000, timeout: 5000,
     enableHighAccuracy: true }
    ).then((resp) => {
      this.notify.presentLoading("Please wait...","bubbles");
      var r:any=resp;
      console.log(resp);
      
          // resp.coords.latitude
          // resp.coords.longitude
          //alert("r succ"+resp.coords.latitude)
         var message;
         this.ShopLocation.accuracy=resp.coords.accuracy;
         this.ShopLocation.altitude=resp.coords.altitude;
         this.ShopLocation.altitudeAccuracy=resp.coords.altitudeAccuracy;
         this.ShopLocation.heading=resp.coords.heading;
         this.ShopLocation.latitude=resp.coords.latitude;
         this.ShopLocation.longitude=resp.coords.longitude;
         this.ShopLocation.speed=resp.coords.speed;
        this.http.post(this.baseUrl+'ResetShopLocation',this.ShopLocation).subscribe(
          res=>{
            console.log(res);
            
               message=res;
               this.notify.hideLoading()
        this.notify.Alert("Success","Location Sucessfully Saved","1000");
              },
        error=>{
          this.notify.hideLoading()
          error.error.error.forEach(element =>{
      this.notify.customTost(element)
        });
        });
          this.lat=resp.coords.latitude
          this.lng=resp.coords.longitude
          },er=>{
            //alert("error getting location")
            alert('Can not retrieve Location! is Your Device Location in On ?')
          }).catch((error) => {
          //alert('Error getting location'+JSON.stringify(error));
          alert('Error getting location - '+JSON.stringify(error))
          });
}
redirectTOLocation(lat,long)
{
  var url="https://www.google.com/maps/search/?api=1&query="+lat+","+long;
  window.open(url, '_blank');


}
}
