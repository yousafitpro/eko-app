import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { appsModel } from '../../models/apps.model';
import { appDownloadService } from '../../services/appDownload.service';
import { Router } from '@angular/router';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {

Apps:appsModel[]=[];
 appVersionDate=MyEnviroment.AppVersionDate;
 DbappVersionDate=MyEnviroment.AppVersionDate;
 appID=MyEnviroment.AppID;
  constructor(
    private appSer:appDownloadService,
    private router:Router
  ) { }

  ngOnInit() {

   // Step-1
    this.isUpdationAvailable();   
  // Step-2
  this.router.navigateByUrl('/shop');
  }


  // check Weather  app is outdated

  isUpdationAvailable()
  {
    
   this.appSer.getDBApps("","1").subscribe(res=>{
      var r:any=res;
        this.Apps=r.apps.data;
    
        if(this.Apps.length<=0)
        {
         
       
        }
        this.Apps.forEach(app=>{
          if(app.appid==this.appID)
          {
            if(app.appupdatedate > this.appVersionDate)
            {
              
              this.router.navigateByUrl("/appManager/appUpdate");
            }
          }
         
        });
       
       },error=>{
     error.error.error.forEach(element => {
              console.log(element);
              
     });
   });

    
  }

}
