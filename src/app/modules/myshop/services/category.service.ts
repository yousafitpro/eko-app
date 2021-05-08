import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryModel, CategoryPaginationModel } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  TempCategoriesList:any=[];
  object=new CategoryModel();
  sideoptionsPopover=new BehaviorSubject<any>(null);
  pagination=new BehaviorSubject<CategoryPaginationModel>(null);
  AllCategoriesDBList=new BehaviorSubject<CategoryModel[]>([]);
  AllCategories= new BehaviorSubject<CategoryModel[]>([]);
  constructor(
    private http:HttpClient,
    ) {




   }
   private baseUrl=MyEnviroment.baseUrl+"admin/product/category/";

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
  getAllCategoriesFromDB(keys,page)
  {
   this.http.post(this.baseUrl+'all?keywords='+keys+"&page="+page,null).subscribe(res=>{
      var r:any=res;
      this.TempCategoriesList=[];
        this.AllCategoriesDBList.next(r.allcategories.data);
        this.pagination.next(r.allcategories);
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



}
