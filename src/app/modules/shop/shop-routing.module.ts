import { ShopComponent } from './shop.component';
import { AllProductsComponent } from './comps/all-products/all-products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopsComponent } from './comps/shops/shops.component';
import { ShopProductsComponent } from './comps/shop-products/shop-products.component';
import { LoginComponent } from '../SharedComps/login/login.component';
import { ProductDetailsComponent } from './comps/product-details/product-details.component';
import { MyshopAboutusComponent } from './comps/myshop-aboutus/myshop-aboutus.component';
import { MyshopCartComponent } from './comps/myshop-cart/myshop-cart.component';
import { ShopOrdersComponent } from './comps/shop-orders/shop-orders.component';
import { ShopOrderProductsComponent } from './comps/shop-order-products/shop-order-products.component';
import { BecomeSellerComponent } from '../SharedComps/become-seller/become-seller.component';
import { RegisterComponent } from '../SharedComps/register/register.component';
import { ResetPaswordComponent } from '../SharedComps/reset-pasword/reset-pasword.component';

const routes: Routes = [

  {path:'',component:ShopComponent,
            children:[
              
                {path:'aboutus',component:MyshopAboutusComponent},
                 {path:'cart',component:MyshopCartComponent},
                {path:'login',component:LoginComponent},
                {path:'resetPassword',component:ResetPaswordComponent},
                {path:'createAccount',component:RegisterComponent},
                {path:'becomeSeller',component:BecomeSellerComponent},
                {path:'Products',component:AllProductsComponent},
                {path:'Shops',component:ShopsComponent},
                {path:':sadminId/Products',component:ShopProductsComponent},
                {path:'orders',component:ShopOrdersComponent},
                {path:':orderId/OrderProducts',component:ShopOrderProductsComponent},
                {path:':sadminId/Products/:productId/:path/Details',component:ProductDetailsComponent},

                
                {path:'',component:AllProductsComponent},
       
            ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
