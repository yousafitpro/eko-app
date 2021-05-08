import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyshopRoutingModule } from './myshop-routing.module';
import { MyshopComponent } from './myshop.component';
import { MyShopTopComponent } from './comps/my-shop-top/my-shop-top.component';
import { MyShopBottomComponent } from './comps/my-shop-bottom/my-shop-bottom.component';
import { MyShopSideMenuComponent } from './comps/my-shop-side-menu/my-shop-side-menu.component';
import { MyShopSidebarTopComponent } from './comps/my-shop-sidebar-top/my-shop-sidebar-top.component';
import { MyShopSidebarBottomComponent } from './comps/my-shop-sidebar-bottom/my-shop-sidebar-bottom.component';
import { MyShopProductsComponent } from './comps/my-shop-products/my-shop-products.component';
import { MyShopBrandsComponent } from './comps/my-shop-brands/my-shop-brands.component';
import { MyShopCategoriesComponent } from './comps/my-shop-categories/my-shop-categories.component';
import { MyShopAddBrandComponent } from './comps/my-shop-add-brand/my-shop-add-brand.component';
import { MyShopAddCategoryComponent } from './comps/my-shop-add-category/my-shop-add-category.component';
import { MyShopAddProductComponent } from './comps/my-shop-add-product/my-shop-add-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryoptionsPopoversComponent } from './comps/popovers/categoryoptions-popovers/categoryoptions-popovers.component';
import { MyShopUpdateCategoryComponent } from './comps/my-shop-update-category/my-shop-update-category.component';
import { BrandoptionPopoverComponent } from './comps/popovers/brandoption-popover/brandoption-popover.component';
import { MyshopUpdateBrandComponent } from './comps/myshop-update-brand/myshop-update-brand.component';
import { MyshopUpdateProductComponent } from './comps/myshop-update-product/myshop-update-product.component';
import { ProductoptionPopoverComponent } from './comps/popovers/productoption-popover/productoption-popover.component';
import { MyshopAddAtributeComponent } from './comps/myshop-add-atribute/myshop-add-atribute.component';
import { MyshopUpdateAtributeComponent } from './comps/myshop-update-atribute/myshop-update-atribute.component';
import { MyshopCategoryAttributesComponent } from './comps/myshop-category-attributes/myshop-category-attributes.component';
import { AttributesPopoverComponent } from './comps/popovers/attributes-popover/attributes-popover.component';
import { MyShopInfoComponent } from './comps/my-shop-info/my-shop-info.component';


@NgModule({
  declarations: [
    MyshopComponent,
    MyShopTopComponent,
    MyShopBottomComponent,
    MyShopSideMenuComponent,
    MyShopSidebarTopComponent,
    MyShopSidebarBottomComponent,
    MyShopProductsComponent,
    MyShopBrandsComponent,
    MyShopCategoriesComponent,
    MyShopAddBrandComponent,
    MyShopAddCategoryComponent,
    MyShopAddProductComponent,
    CategoryoptionsPopoversComponent,
    MyShopUpdateCategoryComponent,
    BrandoptionPopoverComponent,
    MyshopUpdateBrandComponent,
    MyshopUpdateProductComponent,
    ProductoptionPopoverComponent,
    MyshopAddAtributeComponent,
    MyshopUpdateAtributeComponent,
    MyshopCategoryAttributesComponent,
    AttributesPopoverComponent,
    MyShopInfoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MyshopRoutingModule,
    IonicModule
  ]
})
export class MyshopModule { 
  constructor()
  {
    console.log("my Shop Module is Loaded");
    
  }
}
