import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http';

import { AppPaginationModel, appsModel } from '../models/apps.model';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';

@Injectable({
  providedIn: 'root'
})
export class appDownloadService {
  pagination=new BehaviorSubject<AppPaginationModel>(null);

  AllAppsDBList=new BehaviorSubject<appsModel[]>([]);
  constructor(
    private http:HttpClient
    ) {


this.getAppsFromDB("","1");
   }
   private baseUrl=MyEnviroment.baseUrl+"admin/appDownload/";
   add(form)
   {
    return this.http.post(this.baseUrl+'new',form);
   }
   update(form)
   {
    return this.http.post(this.baseUrl+'update',form);
   }
   edit(id)
   {
    return this.http.post(this.baseUrl+'edit?id='+id,null);
   }
   delete(id)
   {
    return this.http.post(this.baseUrl+'delete?id='+id,null);
   }
   getDBApps(keys,page)
   {
     return this.http.post(this.baseUrl+'all?keywords='+keys+"&page="+page,null)
   }
  getAppsFromDB(keys,page)
  {
   this.http.post(this.baseUrl+'all?keywords='+keys+"&page="+page,null).subscribe(res=>{
      var r:any=res;
        this.AllAppsDBList.next(r.apps.data);
        this.pagination.next(r.apps);
       },error=>{
     error.error.error.forEach(element => {
              
     });
   });
  }




}
