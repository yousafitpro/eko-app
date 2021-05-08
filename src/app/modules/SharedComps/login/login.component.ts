import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenSerService } from 'src/app/services/token-ser.service';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { NotifyService } from 'src/app/services/notify.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading:Boolean=false;
  constructor(
    private authSer:AuthService,
    private tokenSer:TokenSerService,
    public toastController: ToastController,
    private notify:NotifyService
  ) { }

  ngOnInit() {
    this.authSer.isLoading.subscribe(res=>{this.isLoading=res});
  }
login(email,password)
{
  this.notify.presentLoading("Please wait...","bubbles")
  var form = new FormData();
  form.append("email",email);
  form.append("password",password);
  this.authSer.LoginUser(form).subscribe(data=>
    {
      this.notify.hideLoading();
    this.handleResponce(data)
    }
    ,error=>
    {
    this.notify.hideLoading();
    this.handleError(error);
    }
    )
}
handleResponce(data:any)
{
  this.tokenSer.set(data.access_token);
  localStorage.setItem("accesseries",JSON.stringify(data.accesseries));
  localStorage.setItem("user",JSON.stringify(data.user));
  this.authSer.IsLogged.next(true)
  this.authSer.loggedinSuccessfully();
}
handleError(res:any)
{
this.presentToast(res.error.error);
}
async presentToast(msg) {
  const toast = await this.toastController.create({
    message:msg,
    duration: 2000
  });
  toast.present();
}
}
