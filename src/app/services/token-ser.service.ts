import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/Storage';
// import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class TokenSerService {
  // private helper = new JwtHelperService();
  public hasToken= new BehaviorSubject<boolean>(false);
  public token =new BehaviorSubject<any>("");
  constructor(private storage: Storage) {
    
  
   this.resetStatus();
  }

  set(token)
  {
      localStorage.setItem("token",token);
  }
  setStaticToken()
  {
  

      this.token.next(localStorage.getItem("token"))
  
  }
  async get()
  {
    // return this.logged_user= await this.storage.get('token');
  }

  remove(token)
  {
    localStorage.removeItem("token")
    this.resetStatus();


  }
  // isValid(token)
  // {
  //     if(token)
  //     {
  //       const payLoad=this.payLoad(token);
  //       if(payLoad)
  //       {

  //         return(payLoad.iss==MyEnviroment.coreISS) ? true:false
  //       }
  //     else{
  //       return false;
  //     }

  //     }
  // }
  // payLoad(token)
  // {

  //   return this.helper.decodeToken(token);
  // }
// decode(payLoad)
// {
//      return JSON.parse(atob(payLoad));
// }
isLogged()
{
  if(this.get())
  {
    return true;
  }
  else
  {
    return false;
  }
}
resetStatus()
{
  if(this.isLogged())
    {
      this.hasToken.next(true);

    }
    else
    {
      this.hasToken.next(false);
    }
}
}
