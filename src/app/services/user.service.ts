import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyEnviroment } from '../GlobalFiles/MyEnviroment';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private http:HttpClient) { }
   private baseUrl=MyEnviroment.baseUrl;
  sendVerificationEmail(email)
  {
    return this.http.post(this.baseUrl+'admin/user/senVerificationEmail?email='+email,null);
  }
  senVerificationEmailForResetPassword(email)
  {
    return this.http.post(this.baseUrl+'admin/user/senVerificationEmailForResetPassword?email='+email,null);
  }
  verifyTheCode(code)
  {
    return this.http.post(this.baseUrl+'admin/user/verifyTheCode?code='+code,null);
  }
  Register(form)
  {
    return this.http.post(this.baseUrl+'admin/user/createNewAccount?',form);
  }
  updatePassword(form)
  {
    return this.http.post(this.baseUrl+'admin/user/updatePassword?',form);
  }
  becomeSeller(form)
  {
    return this.http.post(this.baseUrl+'admin/user/becomeSeller?',form);
  }
}
