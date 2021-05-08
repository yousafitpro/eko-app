import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { AlertController } from '@ionic/angular';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brandoption-popover',
  templateUrl: './brandoption-popover.component.html',
  styleUrls: ['./brandoption-popover.component.scss'],
})
export class BrandoptionPopoverComponent implements OnInit {

  popover:any;
  id:any;
  constructor(
    private brandSer:BrandService,
    public alertController: AlertController,
    private notify:NotifyService,
    private router:Router
    ) { }

  ngOnInit() {}
closePopover()
{
  
  this.brandSer.sideoptionsPopover.subscribe(res=>{

    this.popover=res;
    this.id=this.popover.id
    this.popover.dismiss();
  })

}
ShowDeleteConfirmAlert()
{
  this.closePopover();
  this.presentAlertConfirm();
}
edit()
{
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+this.id+'/UpdateBrand');
}
seeproducts()
{
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+"0"+'/'+this.id+'/Products');
}
async presentAlertConfirm() {

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '<strong>Are you want to Delete this</strong>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        
        }
      }, {
        text: 'Delete',
        handler: () => {
          this.brandSer.delete(this.id).subscribe(res=>{
            this.brandSer.getAllBrandsFromDB("","1");
           this.notify.Alert("Success","Brand successfully Deleted",2000);
          },
          error=>{
            error.error.error.forEach(element => {
              this.notify.Alert("Error",element,"2000");
            });
          })
        }
      }
    ]
  });

  await alert.present();
}
}
