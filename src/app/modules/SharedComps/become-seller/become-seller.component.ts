import { Component, OnInit } from '@angular/core';
import { userService } from 'src/app/services/user.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-become-seller',
  templateUrl: './become-seller.component.html',
  styleUrls: ['./become-seller.component.scss'],
})
export class BecomeSellerComponent implements OnInit {

  email:string="";
  code:string="";
  codeSent:boolean=false;
  codeVerified:boolean=false;
  attempts=0;
  constructor(
    private userSer:userService,
    private notify:NotifyService,
    private router:Router,
    private authSer:AuthService
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
  register(name,address,phone,mobile)
  {
    if(name=="")
    {
      this.notify.customTost("Shop Name is required")
    }
    else if(address=="")
    {
      this.notify.customTost("Shop Address is required")
    }
    else if(phone=="")
    {
      this.notify.customTost("Shop Phone Number is required")
    }
    else if(mobile=="")
    {
      this.notify.customTost("Owner Mobile Number is required")
    }
    else
    {
      this.notify.presentLoading("Please wait...","bubbles");
      var form=new FormData();
      form.append("companyname",name)
      form.append("companyaddress",address)
      form.append("companyphone",phone)
      form.append("mobile",mobile)
      var message;
      this.userSer.becomeSeller(form).subscribe(
        res=>{
          this.notify.hideLoading();
             message=res;
             this.notify.Alert("Success",message.message,1000);
             this.authSer.logoutUser();
             this.router.navigateByUrl('/myshop');
            },
      error=>{
        this.notify.hideLoading();
        error.error.error.forEach(element =>this.notify.Alert("Error",element,2000));
      });
    }

  }
}
