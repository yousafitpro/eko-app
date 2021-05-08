import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop/services/shop.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email:string="";
  code:string="";
  codeSent:boolean=false;
  codeVerified:boolean=false;
  attempts=0;
  constructor(
    private userSer:userService,
    private notify:NotifyService,
    private router:Router
  ) { }

  ngOnInit() {}
  Retry(){
    this.codeSent=false;
    this.codeVerified=false;
  }

  SendVerificationMail(email)
  {
    if(email=="")
    {
      this.notify.customTost("Email is required")
    }
    else{
      this.notify.presentLoading("Please wait...","bubbles")
      var message;
      this.userSer.sendVerificationEmail(email).subscribe(
        res=>{
          this.notify.hideLoading();
             message=res;
             this.notify.Alert("Success",message.message,1000);
             this.codeSent=true;
             this.email=email;
            },
      error=>{
        this.notify.hideLoading();
        error.error.error.forEach(element =>this.notify.customTost(element));
      });
    }

  }
  register(name,pass,rpass,code)
  {
    if(name=="")
    {
      this.notify.customTost("Full Name is required")
    }
    else if(code=="")
    {
      this.notify.customTost("Code is required")
    }
    else if(pass=="")
    {
      this.notify.customTost("Password is required")
    }
    else if(rpass=="")
    {
      this.notify.customTost("Retype Password is required")
    }
    else if(pass!=rpass)
    {
      this.notify.customTost("BothPassword Must be Same")
    }
    else
    {
      this.notify.presentLoading("Please wait...","bubbles")
      var form=new FormData();
      form.append("fullname",name)
      form.append("email",this.email)
      form.append("password",pass)
      form.append("code",code)
      var message;
      this.userSer.Register(form).subscribe(
        res=>{
          this.notify.hideLoading();
             message=res;
             this.notify.Alert("Success",message.message,1000);
             this.router.navigateByUrl('/shop/login');
            },
      error=>{
        this.notify.hideLoading();
        error.error.error.forEach(element =>this.notify.Alert("Error",element,2000));
      });
    }

  }
}
