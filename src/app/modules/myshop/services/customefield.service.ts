import { Injectable } from '@angular/core';
import { CustomFieldModel } from '../models/CustomField.model';
import { brandModel } from '../models/Brand.model';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../../shop/models/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';

@Injectable({
  providedIn: 'root'
})
export class CustomefieldService {
  TempFieldList:any=[];
  object=new CategoryModel();
  AllCustomFieldDBList=new BehaviorSubject<CustomFieldModel[]>([]);
  AllCustomFields= new BehaviorSubject<CustomFieldModel[]>([]);
  constructor(
    private http:HttpClient,
  ) { }
  private baseUrl=MyEnviroment.baseUrl+"admin/product/customfield/";

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
 getAllCustomFieldsFromDB(id,keys)
 {
  this.http.post(this.baseUrl+'all?keywords='+keys+"&categoryid="+id,null).subscribe(res=>{
     var r:any=res;
     this.TempFieldList=[];
       this.AllCustomFieldDBList.next(r.allcustomfields);
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
   this.AllCustomFieldDBList.subscribe(res=>
     {
       this.TempFieldList=[];
       this.TempFieldList=res;
       this.AllCustomFields.next(this.TempFieldList);
     })

 }
}
