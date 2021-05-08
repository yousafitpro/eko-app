import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyShopCategoriesComponent } from './comps/my-shop-categories/my-shop-categories.component';
import { MyShopBrandsComponent } from './comps/my-shop-brands/my-shop-brands.component';
import { MyShopProductsComponent } from './comps/my-shop-products/my-shop-products.component';
import { MyshopComponent } from './myshop.component';
import { MyShopAddCategoryComponent } from './comps/my-shop-add-category/my-shop-add-category.component';
import { MyShopAddBrandComponent } from './comps/my-shop-add-brand/my-shop-add-brand.component';
import { MyShopAddProductComponent } from './comps/my-shop-add-product/my-shop-add-product.component';
import { MyShopWelcomeComponent } from './comps/my-shop-welcome/my-shop-welcome.component';
import { MyShopUpdateCategoryComponent } from './comps/my-shop-update-category/my-shop-update-category.component';
import { MyshopUpdateBrandComponent } from './comps/myshop-update-brand/myshop-update-brand.component';
import { MyshopUpdateProductComponent } from './comps/myshop-update-product/myshop-update-product.component';
import { MyshopCategoryAttributesComponent } from './comps/myshop-category-attributes/myshop-category-attributes.component';
import { MyshopAddAtributeComponent } from './comps/myshop-add-atribute/myshop-add-atribute.component';
import { MyshopUpdateAtributeComponent } from './comps/myshop-update-atribute/myshop-update-atribute.component';
import { MyShopInfoComponent } from './comps/my-shop-info/my-shop-info.component';

const routes: Routes = [
  {path:'',component:MyshopComponent,
  children:[
      {path:'addCategory',component:MyShopAddCategoryComponent},
      {path:'addBrand',component:MyShopAddBrandComponent},
      {path:':cateId/addProduct',component:MyShopAddProductComponent},
      {path:':cateId/attributes',component:MyshopCategoryAttributesComponent},
      {path:':cateId/add-attribute',component:MyshopAddAtributeComponent},
      {path:':id/:cateId/edit-attribute',component:MyshopUpdateAtributeComponent},
      {path:':productId/updateProduct',component:MyshopUpdateProductComponent},
      {path:'Categories',component:MyShopCategoriesComponent},
      {path:':id/UpdateCategory',component:MyShopUpdateCategoryComponent},
      {path:':id/UpdateBrand',component:MyshopUpdateBrandComponent},
      {path:'Brands',component:MyShopBrandsComponent},
      {path:':cateId/:brandId/Products',component:MyShopProductsComponent},
      {path:'shopInfo',component:MyShopInfoComponent},
      {path:'',component:MyShopCategoriesComponent},

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyshopRoutingModule { }
