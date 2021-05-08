import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AlertController } from '@ionic/angular';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoryoptions-popovers',
  templateUrl: './categoryoptions-popovers.component.html',
  styleUrls: ['./categoryoptions-popovers.component.scss'],
})
export class CategoryoptionsPopoversComponent implements OnInit {
  popover:any;
  id:any;
  constructor(
    private catSer:CategoryService,
    public alertController: AlertController,
    private notify:NotifyService,
    private router:Router
    ) { }

  ngOnInit() {}
closePopover()
{
  
  this.catSer.sideoptionsPopover.subscribe(res=>{

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
addProduct()
{
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+this.id+'/addProduct');
}
seeproducts()
{
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+this.id+'/'+"0"+'/Products');
}
edit()
{
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+this.id+'/UpdateCategory');
}
showAttributes(){
  this.closePopover();
  this.router.navigateByUrl('/myshop/'+this.id+'/attributes');
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
          this.catSer.delete(this.id).subscribe(res=>{
            this.catSer.getAllCategoriesFromDB("","1");
           this.notify.Alert("Success","Category successfully Deleted",2000);
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
