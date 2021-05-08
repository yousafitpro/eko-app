import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductModel, ProductPaginationModel } from '../../shop/models/product.model';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  sideoptionsPopover=new BehaviorSubject<any>(null);
  products:ProductModel[]=[];
  selectProduct=new BehaviorSubject<any>(null);
  selectProductForSendOrderRequest=new BehaviorSubject<any>(null);
  TempProductsList:any=[];
  object=new ProductModel();
  AllProductsDBList=new BehaviorSubject<ProductModel[]>([]);
  Pagination=new BehaviorSubject<ProductPaginationModel>(null);
  saveAllProductsDBList=new BehaviorSubject<ProductModel[]>([]);
  AllProducts= new BehaviorSubject<ProductModel[]>([]);
  //tepms
  constructor(
    private http:HttpClient
    ) {






   }
   private baseUrl=MyEnviroment.baseUrl+"admin/product/product/";
   editPermission(id)
   {
    return this.http.post(this.baseUrl+'editPermission?roleid='+id,null);
   }
   updatePermission(id,form)
   {
    return this.http.post(this.baseUrl+'updatePermission?roleid='+id,form);
   }
   add(form)
   {
    return this.http.post(this.baseUrl+'new',form);
   }
   update(form)
   {
    return this.http.post(this.baseUrl+'update',form);
   }
   updateImage(form)
   {
    return this.http.post(this.baseUrl+'updateImage',form);
   }
  getAllProductsFromDB(keys,page,form)
  {

   this.http.post(this.baseUrl+'all?keywords='+keys+"&page="+page,form).subscribe(res=>{
      var r:any=res;
      this.TempProductsList=[];
        this.AllProductsDBList.next(r.allproducts.data);        
        this.saveAllProductsDBList.next(r.allproducts.data);
       this.Pagination.next(r.allproducts);

       },error=>{
     error.error.error.forEach(element => {
         
     });
   });
  }

  active(ids)
  {
    return this.http.post(this.baseUrl+'active?ids='+ids,null);
  }

  unActive(ids)
  {
    return this.http.post(this.baseUrl+'unactive?ids='+ids,null);
  }
  delete(ids)
  {
    return this.http.post(this.baseUrl+'delete?ids='+ids,null);
  }
  edit(id)
  {
    return this.http.post(this.baseUrl+'edit?id='+id,null);
  }
  allBlocked()
  {

    this.AllProductsDBList.subscribe(res=>
      {

        this.TempProductsList=[];
        res.forEach(element => {
          if(element.status===0)
          {

            this.TempProductsList.push(element);
          }
        });
      },);
      this.AllProducts.next(this.TempProductsList);

  }
  allActive()
  {


    this.AllProductsDBList.subscribe(res=>
      {

        this.TempProductsList=[];
        res.forEach(element => {
          if(element.status===1)
          {
            this.TempProductsList.push(element);
          }
        });
      },);
      this.AllProducts.next(this.TempProductsList);

  }
  getAll(keys)
  {
    this.AllProductsDBList.subscribe(res=>
      {
        this.TempProductsList=[];
        this.TempProductsList=res;
        this.AllProducts.next(this.TempProductsList);
      })

  }

}
