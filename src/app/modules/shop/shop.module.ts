import { NgModule } from '@angular/core';
import { ErrorComponent } from './../SharedComps/error/error.component';
import { AllProductsComponent } from './comps/all-products/all-products.component';
import { TopComponent } from './comps/top/top.component';
import { SideMenuComponent } from './comps/side-menu/side-menu.component';
import { ShopComponent } from './shop.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShopRoutingModule } from './shop-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarTopComponent } from './comps/sidebar-top/sidebar-top.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ShopsComponent } from './comps/shops/shops.component';
import { ShopProductsComponent } from './comps/shop-products/shop-products.component';
import { LoginComponent } from '../SharedComps/login/login.component';
import { ProductDetailsComponent } from './comps/product-details/product-details.component';
import { MyshopCartComponent } from './comps/myshop-cart/myshop-cart.component';
import { MyshopAboutusComponent } from './comps/myshop-aboutus/myshop-aboutus.component';
import { ShopOrderProductsComponent } from './comps/shop-order-products/shop-order-products.component';
import { ShopOrderPopoverComponent } from './comps/popovers/shop-order-popover/shop-order-popover.component';
import { ShopOrdersComponent } from './comps/shop-orders/shop-orders.component';
import { RegisterComponent } from '../SharedComps/register/register.component';
import { ResetPaswordComponent } from '../SharedComps/reset-pasword/reset-pasword.component';
import { BecomeSellerComponent } from '../SharedComps/become-seller/become-seller.component';
import { CopURLComponent } from '../SharedComps/cop-url/cop-url.component';
import { ImageViewerComponent } from '../SharedComps/image-viewer/image-viewer.component';



@NgModule({
  declarations: [
    ShopComponent,
    SideMenuComponent,
    TopComponent,
    SidebarTopComponent,
    AllProductsComponent,
    ErrorComponent,
    ShopsComponent,
    ShopProductsComponent,
    LoginComponent,
    ProductDetailsComponent,
    MyshopCartComponent,
    MyshopAboutusComponent,
    ShopOrdersComponent,
    ShopOrderProductsComponent,
    ShopOrderPopoverComponent,
    RegisterComponent,
    ResetPaswordComponent,
    BecomeSellerComponent,
    CopURLComponent,
    SidebarTopComponent,
    ImageViewerComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    IonicModule
  ]
})
export class ShopModule { 
  constructor()
  {
    console.log("Shop Module is loaded");
    
  }
}
