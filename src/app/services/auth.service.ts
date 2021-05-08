import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MyEnviroment } from '../GlobalFiles/MyEnviroment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/Storage';
import { Router } from '@angular/router';
import { TokenSerService } from './token-ser.service';
import { ToastController } from '@ionic/angular';
import { NotifyService } from './notify.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  IsLogged= new BehaviorSubject<boolean>(false);
  isLoading= new BehaviorSubject<boolean>(false);
  private baseUrl=MyEnviroment.baseUrl;
  constructor(
    private http:HttpClient,
    private storage:Storage,
    private notify:NotifyService,
    private tokenSer:TokenSerService,
    public toastController: ToastController
  ) { }
  LoginUser(form:any)
  {
    return this.http.post(this.baseUrl+'auth/login',form);
  }
  logoutUser()
  {
    this.notify.presentLoading("Logging out...","bubbles");
    this.http.post(this.baseUrl+'auth/logout',null).subscribe(data=>{
      this.notify.hideLoading();
      this.loggedoutSuccessfully();

    },error=>{
this.notify.hideLoading();
    })

  }
  loggedinSuccessfully()
  {
    this.notify.customTost("Successfully Logged-in")
    this.IsLogged.next(true);
    location.href=MyEnviroment.refreshURL
    this.tokenSer.setStaticToken();
    this.resetStatus();
  }
  loggedoutSuccessfully()
  {

    this.storage.clear();
    localStorage.clear();
    this.IsLogged.next(false);
    this.notify.customTost("Successfully Logged-out")
    location.href=MyEnviroment.refreshURL;
  }
  accesseries()
  {
    var v="";
    this.storage.get('accesseries').then((val) => {
     v=val
    });
    return v;
  }
resetStatus()
{
  var v1="";
this.tokenSer.token.subscribe(val=>
  {

    if(val)
    {
      this.IsLogged.next(true);

    }
    else
    {
      this.IsLogged.next(false);
    }
  
  });


}

}
