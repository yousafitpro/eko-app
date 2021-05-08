import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { brandModel, BrandPaginationModel } from '../models/Brand.model';
import { BehaviorSubject } from 'rxjs';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  sideoptionsPopover=new BehaviorSubject<any>(null);
  pagination=new BehaviorSubject<BrandPaginationModel>(null);
  TempBrandsList:any=[];
  object=new brandModel();
  AllBrandsDBList=new BehaviorSubject<brandModel[]>([]);
  AllBrands= new BehaviorSubject<brandModel[]>([]);
  constructor(
    private http:HttpClient
    ) {

    this.getAllBrandsFromDB("","1");
    this.getAll("");

   }
   private baseUrl=MyEnviroment.baseUrl+"admin/product/brand/";

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
  getAllBrandsFromDB(keys,page)
  {
   this.http.post(this.baseUrl+'all?keywords='+keys+"&page="+page,null).subscribe(res=>{
      var r:any=res;
      this.TempBrandsList=[];
        this.AllBrandsDBList.next(r.allbrands.data);
        this.pagination.next(r.allbrands)
       },error=>{
     error.error.error.forEach(element => {
             
     });
   });
  }

  delete(ids)
  {
    return this.http.post(this.baseUrl+'delete?ids='+ids,null);
  }
  edit(id)
  {
    return this.http.post(this.baseUrl+'edit?id='+id,null);
  }


  getAll(keys)
  {
    this.AllBrandsDBList.subscribe(res=>
      {
        this.TempBrandsList=[];
        this.TempBrandsList=res;
        this.AllBrands.next(this.TempBrandsList);
      })

  }
}
