import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appDownloadService } from '../../services/appDownload.service';
import { MyEnviroment } from 'src/app/GlobalFiles/MyEnviroment';
import { appsModel } from '../../models/apps.model';

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.component.html',
  styleUrls: ['./app-update.component.scss'],
})
export class AppUpdateComponent implements OnInit {
  Apps:appsModel[]=[];
  appVersionDate=MyEnviroment.AppVersionDate;
  DbappVersionDate="";
  appID=MyEnviroment.AppID;
  app=new appsModel();
  constructor(
    private appSer:appDownloadService,
    private router:Router
  ) { }

  ngOnInit() {
    this.setValues()
  }
  setValues()
  {
    
   this.appSer.getDBApps("","1").subscribe(res=>{
      var r:any=res;
        this.Apps=r.apps.data;
        this.Apps.forEach(app=>{
          if(app.appid==this.appID)
          {
            if(app.appupdatedate > this.appVersionDate)
            {
              this.app=app;
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
