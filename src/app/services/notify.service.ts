import { Injectable } from '@angular/core';

import { ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  loader:any=null;
  modal:any=null;
  constructor(
    public toastController: ToastController,
    public modalController:ModalController,
    private alertController:AlertController,
    private loadingController: LoadingController
  ) { }

async customTost(msg) {
  const toast = await this.toastController.create({
    message:msg,
    duration: 2000
  });
  toast.present();
}
async Alert(title,message,time) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    setTimeout(() => {
     alert.dismiss();
    }, time);
  }
  async presentLoading(message,spinner) {
    if(this.loader)
    {
      this.hideLoading();
    }
    this.loader = await this.loadingController.create({
   cssClass: 'my-custom-class',
   message: message,
   spinner:spinner
 });

 await this.loader.present();

}
// Clipboard_Copy(value)
// {
//   this.clipboard.copy(value);
// }
// Clipboard_clear(value)
// {
//   this.clipboard.clear();
// }
hideLoading()
{
  this.loader.dismiss();
  if(!this.loader)
  {
    this.loader=null;
  }
}
  async showModal(component,data){
    if(this.modal)
    {
      this.hideModal();
    }
   
this.modal = await this.modalController.create({
  component: component,
  cssClass: 'my-custom-class',
  componentProps:data,
});
return await this.modal.present();
}

hideModal()
{
  this.modal.dismiss();
  if(!this.modal)
    {
  this.modal=null;
    }
}
}
